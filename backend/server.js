const express = require("express");

const cors = require("cors");

const bcrypt = require("bcryptjs");

const jwt = require("jsonwebtoken");

require("dotenv").config();

const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const multer = require("multer");

const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024, // 5 MB per image
    files: 10, // maximum 10 images
  },
  fileFilter: (req, file, cb) => {
    const allowedTypes = [
      "image/jpeg",
      "image/jpg",
      "image/png",
      "image/webp",
    ];

    if (!allowedTypes.includes(file.mimetype)) {
      return cb(
        new Error(
          "Only JPG, JPEG, PNG and WebP images are allowed"
        )
      );
    }

    cb(null, true);
  },
});

const { pool, connectDB } = require("./config/db");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// =========================================================
// JWT AUTHENTICATION MIDDLEWARE
// =========================================================

const authenticateToken = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        success: false,
        message: "Authentication required",
      });
    }

    const token = authHeader.split(" ")[1];

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Authentication token missing",
      });
    }

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET
    );

    req.user = {
      id: decoded.userId,
      role: decoded.role,
    };

    next();
  } catch (error) {
    console.error("JWT authentication failed:", error.message);

    return res.status(401).json({
      success: false,
      message: "Invalid or expired authentication token",
    });
  }
};

// Test route
// Test route
app.get("/", (req, res) => {
  res.json({
    message: "FindYourHostel backend is running!",
  });
});

// ==============================
// AUTHENTICATION ROUTES
// ==============================

// Signup
app.post("/api/auth/signup", async (req, res) => {
  try {
    const {
      name,
      email,
      password,
      phone,
    } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "Name, email and password are required",
      });
    }

    if (password.length < 6) {
      return res.status(400).json({
        success: false,
        message: "Password must be at least 6 characters long",
      });
    }

    const normalizedEmail = email.trim().toLowerCase();

    // Check karo email already registered hai ya nahi
    const existingUser = await pool.query(
      `
      SELECT id
      FROM users
      WHERE LOWER(email) = $1;
      `,
      [normalizedEmail]
    );

    if (existingUser.rows.length > 0) {
      return res.status(409).json({
        success: false,
        message: "An account with this email already exists",
      });
    }

    // Password ko securely hash karo
    const passwordHash = await bcrypt.hash(password, 10);

    // New account default STUDENT hoga
    const result = await pool.query(
      `
      INSERT INTO users (
        name,
        email,
        password_hash,
        phone,
        role
      )
      VALUES (
        $1,
        $2,
        $3,
        $4,
        'STUDENT'
      )
      RETURNING
        id,
        name,
        email,
        phone,
        role,
        created_at;
      `,
      [
        name.trim(),
        normalizedEmail,
        passwordHash,
        phone ? phone.trim() : null,
      ]
    );

    const user = result.rows[0];

    // JWT token generate karo
    const token = jwt.sign(
      {
        userId: user.id,
        role: user.role,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d",
      }
    );

    res.status(201).json({
      success: true,
      message: "Account created successfully",
      token,
      user,
    });
  } catch (error) {
    console.error(
      "Signup failed:",
      error.message
    );

    res.status(500).json({
      success: false,
      message: "Unable to create account",
    });
  }
});


// Login
app.post("/api/auth/login", async (req, res) => {
  try {
    const {
      email,
      password,
    } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required",
      });
    }

    const normalizedEmail = email.trim().toLowerCase();

    // User ko email se find karo
    const result = await pool.query(
      `
      SELECT
        id,
        name,
        email,
        password_hash,
        phone,
        role
      FROM users
      WHERE LOWER(email) = $1;
      `,
      [normalizedEmail]
    );

    if (result.rows.length === 0) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    const user = result.rows[0];

    // Entered password ko stored hash se compare karo
    const passwordMatch = await bcrypt.compare(
      password,
      user.password_hash
    );

    if (!passwordMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    // Password response mein kabhi mat bhejo
    delete user.password_hash;

    // JWT token generate karo
    const token = jwt.sign(
      {
        userId: user.id,
        role: user.role,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d",
      }
    );

    res.json({
      success: true,
      message: "Login successful",
      token,
      user,
    });
  } catch (error) {
    console.error(
      "Login failed:",
      error.message
    );

    res.status(500).json({
      success: false,
      message: "Unable to login",
    });
  }
});

// Database test route
app.get("/api/db-test", async (req, res) => {
  try {
    const result = await pool.query("SELECT NOW() AS current_time");

    res.json({
      success: true,
      message: "Database connection is working!",
      databaseTime: result.rows[0].current_time,
    });
  } catch (error) {
    console.error("Database test failed:", error.message);

    res.status(500).json({
      success: false,
      message: "Database connection failed",
    });
  }
});
// Get all properties
// Get all properties with rooms and amenities

// Search colleges
app.get("/api/colleges", async (req, res) => {
  try {
    const { search } = req.query;

    let query = `
      SELECT
        id,
        name,
        city,
        state,
        latitude,
        longitude
      FROM colleges
    `;

    const queryParams = [];

    if (search && search.trim()) {
      queryParams.push(`%${search.trim()}%`);

      query += `
        WHERE
          name ILIKE $1
          OR city ILIKE $1
      `;
    }

    query += `
      ORDER BY name ASC;
    `;

    const result = await pool.query(
      query,
      queryParams
    );

    res.json({
      success: true,
      count: result.rows.length,
      colleges: result.rows,
    });
  } catch (error) {
    console.error(
      "Failed to fetch colleges:",
      error.message
    );

    res.status(500).json({
      success: false,
      message: "Failed to fetch colleges",
    });
  }
});

// Get all properties
// Get all properties with rooms and amenities
// ==================== GET ALL AMENITIES ====================

app.get("/api/amenities", async (req, res) => {
  try {
    const result = await pool.query(
      `
      SELECT
        id,
        name
      FROM amenities
      ORDER BY name ASC;
      `
    );

    res.status(200).json({
      success: true,
      amenities: result.rows,
    });
  } catch (error) {
    console.error("Failed to fetch amenities:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch amenities.",
    });
  }
});

app.get("/api/properties", async (req, res) => {
  try {
    const {
  collegeId,
  type,
  maxPrice,
  gender,
  maxDistance,
  search,
} = req.query;

    let query = `
      SELECT
        p.id,
        p.name,
        p.type,
        p.description,
        p.address,
        p.city,
        p.state,
        p.latitude,
        p.longitude,
       p.gender,
p.security_deposit,
p.availability_status,
p.verification_status,
p.contact_number,
p.food_details,
p.security_details,
p.house_rules,
c.name AS college_name,
        c.latitude AS college_latitude,
        c.longitude AS college_longitude,

        (
          6371 * acos(
            LEAST(
              1,
              GREATEST(
                -1,
                cos(radians(c.latitude))
                * cos(radians(p.latitude))
                * cos(radians(p.longitude) - radians(c.longitude))
                + sin(radians(c.latitude))
                * sin(radians(p.latitude))
              )
            )
          )
        ) AS distance_km

      FROM properties p

      JOIN colleges c
        ON p.college_id = c.id
    `;

    const queryParams = [];
    const conditions = [];

    if (collegeId) {
      queryParams.push(collegeId);

      conditions.push(
        `p.college_id = $${queryParams.length}`
      );
    }
    if (search) {
  queryParams.push(`%${search.trim()}%`);

  conditions.push(`
    (
      p.name ILIKE $${queryParams.length}
      OR p.address ILIKE $${queryParams.length}
      OR p.city ILIKE $${queryParams.length}
      OR c.name ILIKE $${queryParams.length}
    )
  `);
}

    if (type) {
      queryParams.push(type.toUpperCase());

      conditions.push(
        `p.type = $${queryParams.length}`
      );
    }

    if (gender) {
      queryParams.push(gender.toUpperCase());

      conditions.push(
        `p.gender = $${queryParams.length}`
      );
    }

    if (maxPrice) {
      queryParams.push(Number(maxPrice));

      conditions.push(`
        EXISTS (
          SELECT 1
          FROM rooms r
          WHERE r.property_id = p.id
            AND r.price <= $${queryParams.length}
            AND r.available_beds > 0
        )
      `);
    }

    if (maxDistance) {
      queryParams.push(Number(maxDistance));

      conditions.push(`
        (
          6371 * acos(
            LEAST(
              1,
              GREATEST(
                -1,
                cos(radians(c.latitude))
                * cos(radians(p.latitude))
                * cos(
                  radians(p.longitude) - radians(c.longitude)
                )
                + sin(radians(c.latitude))
                * sin(radians(p.latitude))
              )
            )
          )
        ) <= $${queryParams.length}
      `);
    }

    if (conditions.length > 0) {
      query += `
        WHERE ${conditions.join(" AND ")}
      `;
    }

    query += `
      ORDER BY distance_km ASC, p.id ASC;
    `;

    const propertiesResult = await pool.query(
      query,
      queryParams
    );

    const properties = [];

    for (const property of propertiesResult.rows) {
      const roomsResult = await pool.query(
        `
        SELECT
          id,
          room_type,
          price,
          total_beds,
          available_beds,
          has_ac
        FROM rooms
        WHERE property_id = $1
        ORDER BY price ASC;
        `,
        [property.id]
      );

      const amenitiesResult = await pool.query(
        `
        SELECT
          a.id,
          a.name
        FROM amenities a
        JOIN property_amenities pa
          ON a.id = pa.amenity_id
        WHERE pa.property_id = $1
        ORDER BY a.name;
        `,
        [property.id]
      );

      const imagesResult = await pool.query(
  `
  SELECT
    id,
    image_url,
    public_id,
    is_primary,
    display_order
  FROM property_images
  WHERE property_id = $1
  ORDER BY
    is_primary DESC,
    display_order ASC,
    id ASC;
  `,
  [property.id]
);

      properties.push({
        ...property,
        distance_km: Number(
          Number(property.distance_km).toFixed(2)
        ),
        latitude: Number(property.latitude),
        longitude: Number(property.longitude),
        college_latitude: Number(property.college_latitude),
        college_longitude: Number(property.college_longitude),
        rooms: roomsResult.rows,
amenities: amenitiesResult.rows,
images: imagesResult.rows,
      });
    }

    res.json({
      success: true,
      count: properties.length,
      properties,
    });
  } catch (error) {
    console.error(
      "Failed to fetch properties:",
      error.message
    );

    res.status(500).json({
      success: false,
      message: "Failed to fetch properties",
    });
  }
});
// =========================================================
// GET PROPERTIES OWNED BY LOGGED-IN USER
// =========================================================

app.get(
  "/api/my-properties",
  authenticateToken,
  async (req, res) => {
    try {
      const ownerId = req.user.id;

      const propertiesResult = await pool.query(
        `
        SELECT
          p.id,
          p.owner_id,
          p.college_id,
          p.name,
          p.type,
          p.description,
          p.address,
          p.city,
          p.state,
          p.latitude,
          p.longitude,
          p.gender,
          p.security_deposit,
          p.availability_status,
          p.verification_status,
          c.name AS college_name
        FROM properties p
        LEFT JOIN colleges c
          ON p.college_id = c.id
        WHERE p.owner_id = $1
        ORDER BY p.created_at DESC;
        `,
        [ownerId]
      );

      const properties = [];

      for (const property of propertiesResult.rows) {
        const roomsResult = await pool.query(
          `
          SELECT
            id,
            room_type,
            price,
            total_beds,
            available_beds,
            has_ac
          FROM rooms
          WHERE property_id = $1
          ORDER BY price ASC;
          `,
          [property.id]
        );

        const amenitiesResult = await pool.query(
          `
          SELECT
            a.id,
            a.name
          FROM amenities a
          JOIN property_amenities pa
            ON a.id = pa.amenity_id
          WHERE pa.property_id = $1
          ORDER BY a.name;
          `,
          [property.id]
        );

        const imagesResult = await pool.query(
  `
  SELECT
    id,
    image_url,
    public_id,
    is_primary,
    display_order
  FROM property_images
  WHERE property_id = $1
  ORDER BY
    is_primary DESC,
    display_order ASC,
    id ASC;
  `,
  [property.id]
);

        properties.push({
          ...property,
          latitude: Number(property.latitude),
          longitude: Number(property.longitude),
          rooms: roomsResult.rows,
amenities: amenitiesResult.rows,
images: imagesResult.rows,
        });
      }

      res.json({
        success: true,
        count: properties.length,
        properties,
      });
    } catch (error) {
      console.error(
        "Failed to fetch my properties:",
        error.message
      );

      res.status(500).json({
        success: false,
        message: "Failed to fetch your properties",
      });
    }
  }
);
// =========================================================
// CREATE PROPERTY — AUTHENTICATED USER ONLY
// =========================================================
// =========================================================
// UPLOAD PROPERTY IMAGES — AUTHENTICATED OWNER ONLY
// =========================================================

app.post(
  "/api/properties/:id/images",
  authenticateToken,
  upload.array("images", 10),
  async (req, res) => {
    try {
      const propertyId = Number(req.params.id);
      const ownerId = req.user.id;

      if (!Number.isFinite(propertyId)) {
        return res.status(400).json({
          success: false,
          message: "Invalid property ID",
        });
      }

      if (!req.files || req.files.length === 0) {
        return res.status(400).json({
          success: false,
          message: "Please select at least one image",
        });
      }

      // Check karo ki property logged-in user ki hi hai
      const propertyResult = await pool.query(
        `
        SELECT id, name
        FROM properties
        WHERE id = $1
          AND owner_id = $2;
        `,
        [propertyId, ownerId]
      );

      if (propertyResult.rows.length === 0) {
        return res.status(404).json({
          success: false,
          message:
            "Property not found or does not belong to this account",
        });
      }

      // Existing images count check karo
      const existingImagesResult = await pool.query(
        `
        SELECT COUNT(*)::int AS image_count
        FROM property_images
        WHERE property_id = $1;
        `,
        [propertyId]
      );

      const existingImageCount =
        existingImagesResult.rows[0].image_count;

      if (existingImageCount + req.files.length > 10) {
        return res.status(400).json({
          success: false,
          message: `A property can have a maximum of 10 images. You already have ${existingImageCount} image(s).`,
        });
      }

      // Existing images hain ya nahi
      const hasExistingImages = existingImageCount > 0;

      // Existing images ka maximum display order
      const displayOrderResult = await pool.query(
        `
        SELECT COALESCE(MAX(display_order), -1) AS max_order
        FROM property_images
        WHERE property_id = $1;
        `,
        [propertyId]
      );

      let nextDisplayOrder =
        Number(displayOrderResult.rows[0].max_order) + 1;

      const uploadedImages = [];

      for (const file of req.files) {
        const cloudinaryResult =
          await new Promise((resolve, reject) => {
            const uploadStream =
              cloudinary.uploader.upload_stream(
                {
                  folder: `findyourhostel/properties/${propertyId}`,
                  resource_type: "image",
                },
                (error, result) => {
                  if (error) {
                    reject(error);
                    return;
                  }

                  resolve(result);
                }
              );

            uploadStream.end(file.buffer);
          });

        // First-ever image automatically primary banegi
        const isPrimary =
          !hasExistingImages &&
          uploadedImages.length === 0;

        const imageResult = await pool.query(
          `
          INSERT INTO property_images (
            property_id,
            image_url,
            public_id,
            is_primary,
            display_order
          )
          VALUES ($1, $2, $3, $4, $5)
          RETURNING
            id,
            property_id,
            image_url,
            public_id,
            is_primary,
            display_order,
            created_at;
          `,
          [
            propertyId,
            cloudinaryResult.secure_url,
            cloudinaryResult.public_id,
            isPrimary,
            nextDisplayOrder,
          ]
        );

        uploadedImages.push(imageResult.rows[0]);

        nextDisplayOrder += 1;
      }

      res.status(201).json({
        success: true,
        message: `${uploadedImages.length} image(s) uploaded successfully`,
        images: uploadedImages,
      });
    } catch (error) {
      console.error(
        "Failed to upload property images:",
        error.message
      );

      res.status(500).json({
        success: false,
        message:
          error.message ||
          "Failed to upload property images",
      });
    }
  }
);
app.post(
  "/api/properties",
  authenticateToken,
  async (req, res) => {
    const client = await pool.connect();

   try {
  const {
    collegeId,
    name,
    type,
    description,
    address,
    city,
    state,
    latitude,
    longitude,
    gender,
    securityDeposit,
    availabilityStatus,
    contactNumber,
    foodDetails,
    securityDetails,
    houseRules,
    rooms,
    amenityIds,
  } = req.body;

      // JWT se logged-in user ki ID lo
      const ownerId = req.user.id;

      // Required property fields check karo
      if (
        !collegeId ||
        !name ||
        !type ||
        !address ||
        !city ||
        !state
      ) {
        return res.status(400).json({
          success: false,
          message:
            "collegeId, name, type, address, city, and state are required",
        });
      }

      // Rooms array check karo
      if (!Array.isArray(rooms) || rooms.length === 0) {
        return res.status(400).json({
          success: false,
          message: "At least one room option is required",
        });
      }

      // Room data validate karo
      for (const room of rooms) {
  const price = Number(room.price);

  if (
    !room.roomType ||
    !Number.isFinite(price) ||
    price < 0
  ) {
    return res.status(400).json({
      success: false,
      message:
        "Each room must have a valid room type and price",
    });
  }
}

// Selected amenities ko property ke saath link karo
if (Array.isArray(amenityIds) && amenityIds.length > 0) {
  for (const amenityId of amenityIds) {
    await client.query(
      `
      INSERT INTO property_amenities (
        property_id,
        amenity_id
      )
      VALUES ($1, $2);
      `,
      [createdProperty.id, Number(amenityId)]
    );
  }
}

      // Logged-in user exist karta hai ya nahi
      const ownerResult = await client.query(
        `
        SELECT id
        FROM users
        WHERE id = $1;
        `,
        [ownerId]
      );

      if (ownerResult.rows.length === 0) {
        return res.status(404).json({
          success: false,
          message: "User not found",
        });
      }

      // College exist karta hai ya nahi
      const collegeResult = await client.query(
        `
        SELECT id
        FROM colleges
        WHERE id = $1;
        `,
        [collegeId]
      );

      if (collegeResult.rows.length === 0) {
        return res.status(404).json({
          success: false,
          message: "College not found",
        });
      }

      // Transaction start karo
      await client.query("BEGIN");

      // Property insert karo
      const propertyResult = await client.query(
        `
       INSERT INTO properties (
  owner_id,
  college_id,
  name,
  type,
  description,
  address,
  city,
  state,
  latitude,
  longitude,
  gender,
  security_deposit,
  availability_status,
  contact_number,
  food_details,
  security_details,
  house_rules,
  verification_status
)
       VALUES (
  $1,
  $2,
  $3,
  $4,
  $5,
  $6,
  $7,
  $8,
  $9,
  $10,
  $11,
  $12,
  $13,
  'PENDING'
)
        RETURNING *;
        `,
        [
          ownerId,
          collegeId,
          name,
          type,
          description || null,
          address,
          city,
          state,
          latitude || null,
          longitude || null,
          gender || null,
          securityDeposit || null,
          availabilityStatus || "AVAILABLE",
          
contactNumber || null,
foodDetails || null,
securityDetails || null,
houseRules || null,
        ]
      );

      const createdProperty = propertyResult.rows[0];

      // Room type ko database format me convert karne ke liye map
      const roomTypeMap = {
        SINGLE: "Single Room",
        DOUBLE: "Double Sharing",
        TRIPLE: "Triple Sharing",
        FOUR: "Four Sharing",
      };

      // Saare rooms insert karo
      for (const room of rooms) {
        const roomType = roomTypeMap[room.roomType];

        if (!roomType) {
          throw new Error(
            `Invalid room type: ${room.roomType}`
          );
        }

        await client.query(
  `
  INSERT INTO rooms (
    property_id,
    room_type,
    price,
    total_beds,
    available_beds,
    has_ac
  )
  VALUES (
    $1,
    $2,
    $3,
    1,
    1,
    $4
  );
  `,
  [
    createdProperty.id,
    roomType,
    Number(room.price),
    false,
  ]
);
      }

      // Property + rooms successfully save hue
      await client.query("COMMIT");

      res.status(201).json({
        success: true,
        message:
          "Property and room options submitted for verification",
        property: createdProperty,
      });
    } catch (error) {
      await client.query("ROLLBACK");

      console.error(
        "Failed to create property:",
        error.message
      );

      res.status(500).json({
        success: false,
        message: "Failed to create property",
      });
    } finally {
      client.release();
    }
  }
);
// =========================================================
// UPDATE PROPERTY — AUTHENTICATED OWNER ONLY
// =========================================================

app.put(
  "/api/properties/:id",
  authenticateToken,
  async (req, res) => {
    const client = await pool.connect();

    try {
      const propertyId = Number(req.params.id);
const {
  collegeId,
  name,
  type,
  description,
  address,
  city,
  state,
  latitude,
  longitude,
  gender,
  securityDeposit,
  availabilityStatus,
  contactNumber,
  foodDetails,
  securityDetails,
  houseRules,
  rooms,
  amenityIds,
} = req.body;
      // JWT se logged-in user ki ID
      const ownerId = req.user.id;

      if (!Number.isFinite(propertyId)) {
        return res.status(400).json({
          success: false,
          message: "Invalid property ID",
        });
      }

      if (
        !collegeId ||
        !name ||
        !type ||
        !address ||
        !city ||
        !state
      ) {
        return res.status(400).json({
          success: false,
          message:
            "collegeId, name, type, address, city, and state are required",
        });
      }

      if (!Array.isArray(rooms) || rooms.length === 0) {
        return res.status(400).json({
          success: false,
          message: "At least one room option is required",
        });
      }

      // Room data validate karo
      for (const room of rooms) {
  const price = Number(room.price);

  if (
    !room.roomType ||
    !Number.isFinite(price) ||
    price < 0
  ) {
    return res.status(400).json({
      success: false,
      message:
        "Each room must have a valid room type and price",
    });
  }
}

      // IMPORTANT:
      // Property sirf tab update hogi jab logged-in user uska owner ho.
      const propertyResult = await client.query(
        `
        SELECT id
        FROM properties
        WHERE id = $1
          AND owner_id = $2;
        `,
        [propertyId, ownerId]
      );

      if (propertyResult.rows.length === 0) {
        return res.status(404).json({
          success: false,
          message:
            "Property not found or does not belong to this account",
        });
      }

      // College exist karta hai ya nahi
      const collegeResult = await client.query(
        `
        SELECT id
        FROM colleges
        WHERE id = $1;
        `,
        [collegeId]
      );

      if (collegeResult.rows.length === 0) {
        return res.status(404).json({
          success: false,
          message: "College not found",
        });
      }

      await client.query("BEGIN");

      // Property update
      const updateResult = await client.query(
        `
        UPDATE properties
SET
  college_id = $1,
  name = $2,
  type = $3,
  description = $4,
  address = $5,
  city = $6,
  state = $7,
  latitude = $8,
  longitude = $9,
  gender = $10,
  security_deposit = $11,
  availability_status = $12,
  contact_number = $13,
  food_details = $14,
  security_details = $15,
  house_rules = $16,
  verification_status = 'PENDING',
  updated_at = CURRENT_TIMESTAMP
WHERE id = $17
  AND owner_id = $18
RETURNING *;
        `,
        [
  collegeId,
  name,
  type,
  description || null,
  address,
  city,
  state,
  latitude || null,
  longitude || null,
  gender || null,
  securityDeposit || null,
  availabilityStatus || "AVAILABLE",
  contactNumber || null,
  foodDetails || null,
  securityDetails || null,
  houseRules || null,
  propertyId,
  ownerId,
]
      );

      const updatedProperty = updateResult.rows[0];

      // Purane rooms remove karo
      await client.query(
        `
        DELETE FROM rooms
        WHERE property_id = $1;
        `,
        [propertyId]
      );

      const roomTypeMap = {
        SINGLE: "Single Room",
        DOUBLE: "Double Sharing",
        TRIPLE: "Triple Sharing",
        FOUR: "Four Sharing",
      };

      // Updated rooms insert karo
      for (const room of rooms) {
        const roomType = roomTypeMap[room.roomType];

        if (!roomType) {
          throw new Error(
            `Invalid room type: ${room.roomType}`
          );
        }

       await client.query(
  `
  INSERT INTO rooms (
    property_id,
    room_type,
    price,
    total_beds,
    available_beds,
    has_ac
  )
  VALUES ($1,$2,$3,1,1,$4);
  `,
  [
    propertyId,
    roomType,
    Number(room.price),
    false,
  ]
);
      }

            // Purani amenities remove karo
      await client.query(
        `
        DELETE FROM property_amenities
        WHERE property_id = $1;
        `,
        [propertyId]
      );

      // Nayi selected amenities insert karo
      if (Array.isArray(amenityIds) && amenityIds.length > 0) {
        for (const amenityId of amenityIds) {
          await client.query(
            `
            INSERT INTO property_amenities (
              property_id,
              amenity_id
            )
            VALUES ($1, $2);
            `,
            [propertyId, Number(amenityId)]
          );
        }
      }

      // Purane amenities remove karo
await client.query(
  `
  DELETE FROM property_amenities
  WHERE property_id = $1;
  `,
  [propertyId]
);

// Selected amenities save karo
if (Array.isArray(amenityIds) && amenityIds.length > 0) {
  for (const amenityId of amenityIds) {
    await client.query(
      `
      INSERT INTO property_amenities (
        property_id,
        amenity_id
      )
      VALUES ($1, $2);
      `,
      [
        propertyId,
        Number(amenityId),
      ]
    );
  }
}

      await client.query("COMMIT");

      res.json({
        success: true,
        message:
          "Property updated successfully and submitted for verification",
        property: updatedProperty,
      });
    } catch (error) {
      await client.query("ROLLBACK");

      console.error(
        "Failed to update property:",
        error.message
      );

      res.status(500).json({
        success: false,
        message: "Failed to update property",
      });
    } finally {
      client.release();
    }
  }
);



// =========================================================
// DELETE PROPERTY — AUTHENTICATED OWNER ONLY
// =========================================================

app.delete(
  "/api/properties/:id",
  authenticateToken,
  async (req, res) => {
    const client = await pool.connect();

    try {
      const propertyId = Number(req.params.id);
      const ownerId = req.user.id;

      if (!Number.isFinite(propertyId)) {
        return res.status(400).json({
          success: false,
          message: "Invalid property ID",
        });
      }

      // Sirf logged-in owner ki property delete hogi
      const propertyResult = await client.query(
        `
        SELECT id, name
        FROM properties
        WHERE id = $1
          AND owner_id = $2;
        `,
        [propertyId, ownerId]
      );

      if (propertyResult.rows.length === 0) {
        return res.status(404).json({
          success: false,
          message:
            "Property not found or does not belong to this account",
        });
      }

      const deletedProperty = propertyResult.rows[0];

      await client.query(
        `
        DELETE FROM properties
        WHERE id = $1
          AND owner_id = $2;
        `,
        [propertyId, ownerId]
      );

      res.json({
        success: true,
        message: "Property deleted successfully",
        property: deletedProperty,
      });
    } catch (error) {
      console.error(
        "Failed to delete property:",
        error.message
      );

      res.status(500).json({
        success: false,
        message: "Failed to delete property",
      });
    } finally {
      client.release();
    }
  }
);

// Server
const PORT = process.env.PORT || 5000;

const startServer = async () => {
  await connectDB();

  const server = app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
    console.log("Server process is staying alive...");
  });

  server.on("error", (error) => {
    console.error("SERVER ERROR:");
    console.error(error);
  });

  server.on("close", () => {
    console.log("SERVER CLOSED!");
  });
};

startServer().catch((error) => {
  console.error("STARTUP ERROR:");
  console.error(error);
});
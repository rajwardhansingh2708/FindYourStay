import { useEffect, useState } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
    Tooltip,
    useMap,
  useMapEvents,
} from "react-leaflet";
const LocationPicker = ({ onLocationSelect }) => {
  useMapEvents({
    click(event) {
      onLocationSelect([
        event.latlng.lat,
        event.latlng.lng,
      ]);
    },
  });

  return null;
};

const AddProperty = ({ propertyToEdit = null, onClose }) => {
 const [formData, setFormData] = useState({
  name: propertyToEdit?.name || "",
  type: propertyToEdit?.type || "PG",
  description: propertyToEdit?.description || "",

  collegeId: propertyToEdit?.collegeId
    ? String(propertyToEdit.collegeId)
    : "",

  address: propertyToEdit?.address || "",
  city: propertyToEdit?.city || "",
  state: propertyToEdit?.state || "",

  latitude: propertyToEdit?.latitude
    ? String(propertyToEdit.latitude)
    : "",

  longitude: propertyToEdit?.longitude
    ? String(propertyToEdit.longitude)
    : "",

  gender: propertyToEdit?.gender || "UNISEX",

  securityDeposit:
    propertyToEdit?.securityDeposit
      ? String(propertyToEdit.securityDeposit)
      : "",

  availabilityStatus:
    propertyToEdit?.availabilityStatus || "AVAILABLE",

  contactNumber:
    propertyToEdit?.contactNumber || "",

  foodDetails:
    propertyToEdit?.foodDetails || "",

  securityDetails:
    propertyToEdit?.securityDetails || "",

  houseRules:
    propertyToEdit?.houseRules || "",
});

const [rooms, setRooms] = useState([
  {
    roomType: "SINGLE",
    price: "",
    capacity: 1,
    availableBeds: "",
  },
]);

  const [selectedLocation, setSelectedLocation] = useState(null);
const [locationLoading, setLocationLoading] =
  useState(false);

const [locationError, setLocationError] = useState("");

const [collegeSuggestions, setCollegeSuggestions] = useState([]);
const [selectedCollege, setSelectedCollege] = useState(null);
const [collegeLoading, setCollegeLoading] = useState(false);

const [loading, setLoading] = useState(false);
const [message, setMessage] = useState("");
const [error, setError] = useState("");

const [selectedImages, setSelectedImages] = useState([]);
const [existingImages, setExistingImages] = useState([]);
const [imageUploadLoading, setImageUploadLoading] = useState(false);
const [imageUploadError, setImageUploadError] = useState("");
const [amenities, setAmenities] = useState([]);
const [selectedAmenities, setSelectedAmenities] = useState([]);
const [amenitiesLoading, setAmenitiesLoading] = useState(false);
const [amenitiesError, setAmenitiesError] = useState("");

  const handleChange = (event) => {
  const { name, value } = event.target;

  setFormData((previousData) => ({
    ...previousData,
    [name]: value,
  }));
};
const amenityToggle = (amenityId) => {
  setSelectedAmenities((previousAmenities) => {
    const id = Number(amenityId);

    if (previousAmenities.includes(id)) {
      return previousAmenities.filter(
        (existingId) => existingId !== id
      );
    }

    return [...previousAmenities, id];
  });
};
const handleRoomChange = (index, field, value) => {
  setRooms((previousRooms) =>
    previousRooms.map((room, roomIndex) =>
      roomIndex === index
        ? {
            ...room,
            [field]: value,
          }
        : room
    )
  );
};
const handleImageSelect = (event) => {
  const handleAmenityToggle = (amenityId) => {
  const id = Number(amenityId);

  setSelectedAmenities((previous) => {
    if (previous.includes(id)) {
      return previous.filter(
        (selectedId) => selectedId !== id
      );
    }

    return [...previous, id];
  });
};
  const files = Array.from(event.target.files || []);

  if (files.length === 0) {
    return;
  }

  setImageUploadError("");

  const currentCount = existingImages.length + selectedImages.length;

  if (currentCount + files.length > 10) {
    setImageUploadError(
      "You can upload a maximum of 10 images per property."
    );
    event.target.value = "";
    return;
  }

  const validFiles = [];

  for (const file of files) {
    const allowedTypes = [
      "image/jpeg",
      "image/jpg",
      "image/png",
      "image/webp",
    ];

    if (!allowedTypes.includes(file.type)) {
      setImageUploadError(
        "Only JPG, JPEG, PNG and WebP images are allowed."
      );
      continue;
    }

    if (file.size > 5 * 1024 * 1024) {
      setImageUploadError(
        "Each image must be smaller than 5 MB."
      );
      continue;
    }

    validFiles.push({
      file,
      preview: URL.createObjectURL(file),
      id: `${file.name}-${file.size}-${file.lastModified}-${Math.random()}`,
    });
  }

  if (validFiles.length > 0) {
    setSelectedImages((previousImages) => [
      ...previousImages,
      ...validFiles,
    ]);
  }

  event.target.value = "";
};

const removeSelectedImage = (imageId) => {
  setSelectedImages((previousImages) => {
    const imageToRemove = previousImages.find(
      (image) => image.id === imageId
    );

    if (imageToRemove?.preview) {
      URL.revokeObjectURL(imageToRemove.preview);
    }

    return previousImages.filter(
      (image) => image.id !== imageId
    );
  });
};
const addRoom = () => {
  setRooms((previousRooms) => [
    ...previousRooms,
    {
      roomType: "DOUBLE",
      price: "",
      capacity: 2,
      availableBeds: "",
    },
  ]);
};

const removeRoom = (index) => {
  setRooms((previousRooms) => {
    if (previousRooms.length === 1) {
      return previousRooms;
    }

    return previousRooms.filter(
      (_, roomIndex) => roomIndex !== index
    );
  });
};

useEffect(() => {
  if (!propertyToEdit) {
    return;
  }

  const propertyTypeMap = {
    PG: "PG",
    Hostel: "HOSTEL",
    "Co-living": "CO_LIVING",
    HOSTEL: "HOSTEL",
    CO_LIVING: "CO_LIVING",
  };

  const roomTypeMap = {
    "Single Room": "SINGLE",
    Single: "SINGLE",

    "Double Sharing": "DOUBLE",
    Double: "DOUBLE",

    "Triple Sharing": "TRIPLE",
    Triple: "TRIPLE",

    "Four Sharing": "FOUR",
    Four: "FOUR",
  };

  console.log("EDIT PROPERTY:", propertyToEdit);
  console.log("EDIT AMENITIES:", propertyToEdit?.amenities);

  setFormData({
    name: propertyToEdit.name || "",

    type:
      propertyTypeMap[propertyToEdit.type] || "PG",

    description:
      propertyToEdit.description || "",

    collegeId: propertyToEdit.collegeId
      ? String(propertyToEdit.collegeId)
      : "",

    address:
      propertyToEdit.address || "",

    city:
      propertyToEdit.city || "",

    state:
      propertyToEdit.state || "",

    latitude:
      propertyToEdit.latitude !== null &&
      propertyToEdit.latitude !== undefined
        ? String(propertyToEdit.latitude)
        : "",

    longitude:
      propertyToEdit.longitude !== null &&
      propertyToEdit.longitude !== undefined
        ? String(propertyToEdit.longitude)
        : "",

    gender:
      propertyToEdit.gender || "UNISEX",

    securityDeposit:
      propertyToEdit.securityDeposit !== null &&
      propertyToEdit.securityDeposit !== undefined
        ? String(propertyToEdit.securityDeposit)
        : "",

    availabilityStatus:
      propertyToEdit.availabilityStatus ||
      "AVAILABLE",

    contactNumber:
      propertyToEdit.contactNumber ||
      propertyToEdit.contact_number ||
      "",

    foodDetails:
      propertyToEdit.foodDetails ||
      propertyToEdit.food_details ||
      propertyToEdit.details?.food ||
      "",

    securityDetails:
      propertyToEdit.securityDetails ||
      propertyToEdit.security_details ||
      propertyToEdit.details?.security ||
      "",

    houseRules:
      propertyToEdit.houseRules ||
      propertyToEdit.house_rules ||
      propertyToEdit.details?.rules ||
      "",
  });

  /*
   * Existing amenities ko edit form mein select karna
   *
   * Agar amenities API objects hain:
   * [{ id: 1, name: "Wi-Fi" }, ...]
   *
   * to unke IDs directly use honge.
   */
  if (Array.isArray(propertyToEdit.amenities)) {
    const existingAmenityIds = propertyToEdit.amenities
      .map((amenity) => {
        if (
          amenity &&
          typeof amenity === "object" &&
          amenity.id !== undefined
        ) {
          return Number(amenity.id);
        }

        return null;
      })
      .filter((id) => id !== null && !Number.isNaN(id));

    setSelectedAmenities(existingAmenityIds);
  } else {
    setSelectedAmenities([]);
  }

  if (
    propertyToEdit.collegeId &&
    propertyToEdit.collegeName
  ) {
    setSelectedCollege({
      id: Number(propertyToEdit.collegeId),
      name: propertyToEdit.collegeName,
      city: propertyToEdit.city || "",
      state: propertyToEdit.state || "",
      latitude:
        propertyToEdit.collegeLatitude || null,
      longitude:
        propertyToEdit.collegeLongitude || null,
    });
  }

  if (
    propertyToEdit.latitude !== null &&
    propertyToEdit.latitude !== undefined &&
    propertyToEdit.longitude !== null &&
    propertyToEdit.longitude !== undefined
  ) {
    setSelectedLocation([
      Number(propertyToEdit.latitude),
      Number(propertyToEdit.longitude),
    ]);
  }

  if (
    Array.isArray(propertyToEdit.images) &&
    propertyToEdit.images.length > 0
  ) {
    const sortedImages = [...propertyToEdit.images].sort(
      (a, b) => {
        if (a.is_primary !== b.is_primary) {
          return a.is_primary ? -1 : 1;
        }

        return (
          Number(a.display_order || 0) -
          Number(b.display_order || 0)
        );
      }
    );

    setExistingImages(sortedImages);
  } else {
    setExistingImages([]);
  }

  if (
    Array.isArray(propertyToEdit.rooms) &&
    propertyToEdit.rooms.length > 0
  ) {
    const existingRooms = propertyToEdit.rooms.map(
      (room) => ({
        roomType:
          roomTypeMap[room.room_type] ||
          roomTypeMap[room.type] ||
          "SINGLE",

        price:
          room.price !== null &&
          room.price !== undefined
            ? String(room.price)
            : "",

        capacity:
          room.totalBeds !== undefined
            ? Number(room.totalBeds)
            : room.total_beds !== undefined
            ? Number(room.total_beds)
            : room.capacity !== undefined
            ? Number(room.capacity)
            : 1,

        availableBeds:
          room.availableBeds !== undefined
            ? String(room.availableBeds)
            : room.available_beds !== undefined
            ? String(room.available_beds)
            : "",
      })
    );

    setRooms(existingRooms);
  }
}, [propertyToEdit]);


useEffect(() => {
  const fetchAmenities = async () => {
    try {
      setAmenitiesLoading(true);
      setAmenitiesError("");

      const response = await fetch(
        "http://localhost:5000/api/amenities"
      );

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(
          data.message || "Failed to load amenities."
        );
      }

      setAmenities(data.amenities || []);
    } catch (error) {
      console.error("Failed to fetch amenities:", error);

      setAmenitiesError(
        error.message || "Unable to load amenities."
      );
    } finally {
      setAmenitiesLoading(false);
    }
  };

  fetchAmenities();
}, []);

useEffect(() => {
  const searchColleges = async () => {
    const query = formData.collegeId.trim();

    if (!query) {
      setCollegeSuggestions([]);
      return;
    }

    try {
      setCollegeLoading(true);

      const response = await fetch(
        `http://localhost:5000/api/colleges?search=${encodeURIComponent(query)}`
      );

      if (!response.ok) {
        throw new Error("Failed to search colleges");
      }

      const data = await response.json();

      if (!data.success) {
        throw new Error("Backend returned an error");
      }

      setCollegeSuggestions(data.colleges || []);
    } catch (error) {
      console.error("Failed to search colleges:", error);
      setCollegeSuggestions([]);
    } finally {
      setCollegeLoading(false);
    }
  };

  const timeoutId = setTimeout(searchColleges, 300);

  return () => clearTimeout(timeoutId);
}, [formData.collegeId]);
const handleCollegeSelect = (college) => {
  setSelectedCollege(college);

  setFormData((previousData) => ({
    ...previousData,
    collegeId: String(college.id),
  }));

  setCollegeSuggestions([]);
};

  
const collegeLocation = selectedCollege
  ? [
      Number(selectedCollege.latitude),
      Number(selectedCollege.longitude),
    ]
  : null;

const calculateDistanceKm = (pointA, pointB) => {
  if (!pointA || !pointB) {
    return null;
  }

  const [lat1, lon1] = pointA.map(Number);
  const [lat2, lon2] = pointB.map(Number);

  const toRadians = (degrees) => {
    return (degrees * Math.PI) / 180;
  };

  const earthRadiusKm = 6371;

  const dLat = toRadians(lat2 - lat1);
  const dLon = toRadians(lon2 - lon1);

  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRadians(lat1)) *
      Math.cos(toRadians(lat2)) *
      Math.sin(dLon / 2) ** 2;

  const c =
    2 * Math.atan2(
      Math.sqrt(a),
      Math.sqrt(1 - a)
    );

  return earthRadiusKm * c;
};

const distanceFromCollege = calculateDistanceKm(
  collegeLocation,
  selectedLocation
);

const handleLocationSelect = (position) => {
  const [latitude, longitude] = position;

  setSelectedLocation(position);

  setFormData((previousData) => ({
    ...previousData,
    latitude: latitude.toFixed(6),
    longitude: longitude.toFixed(6),
  }));
};

const handleFindLocation = async () => {
  const addressParts = [
    formData.address,
    formData.city,
    formData.state,
    formData.postalCode,
    "India",
  ].filter((value) => value && value.trim());

  const searchAddress = addressParts.join(", ");

  if (!formData.address.trim() || !formData.city.trim() || !formData.state.trim()) {
    setLocationError(
      "Please enter the complete property address, city and state first."
    );
    return;
  }

  try {
    setLocationLoading(true);
    setLocationError("");

    const response = await fetch(
      `https://nominatim.openstreetmap.org/search?format=jsonv2&limit=5&addressdetails=1&q=${encodeURIComponent(
        searchAddress
      )}`,
      {
        headers: {
          Accept: "application/json",
        },
      }
    );

    if (!response.ok) {
      throw new Error("Unable to find this location right now.");
    }

    const data = await response.json();

    if (!data || data.length === 0) {
      setSelectedLocation(null);

      setLocationError(
        "Location not found. Please check the address, city, state and PIN code."
      );

      return;
    }

    const bestResult = data[0];

    const latitude = Number(bestResult.lat);
    const longitude = Number(bestResult.lon);

    if (!Number.isFinite(latitude) || !Number.isFinite(longitude)) {
      throw new Error("Invalid coordinates received.");
    }

    const position = [latitude, longitude];

    setSelectedLocation(position);

    setFormData((previousData) => ({
      ...previousData,
      latitude: latitude.toFixed(6),
      longitude: longitude.toFixed(6),
    }));

    setLocationError("");
  } catch (error) {
    console.error("Failed to find property location:", error);

    setSelectedLocation(null);

    setLocationError(
      "Unable to find this location. Please check the address and try again."
    );
  } finally {
    setLocationLoading(false);
  }
};

const handleSubmit = async (event) => {
  event.preventDefault();

  setMessage("");
  setError("");

  if (!selectedCollege) {
    setError("Please select a college from the suggestions.");
    return;
  }

  if (!selectedLocation) {
    setError("Please find and confirm the property location on the map.");
    return;
  }

  const token = localStorage.getItem("findYourHostelToken");

  if (!token) {
    setError("Please log in before listing a property.");
    return;
  }

  setLoading(true);

  try {
    console.log("SELECTED COLLEGE:", selectedCollege);
console.log("COLLEGE ID:", selectedCollege?.id);
    const requestBody = {
      collegeId: Number(selectedCollege.id),

      name: formData.name,
      type: formData.type,
      description: formData.description,
      address: formData.address,
      city: formData.city,
      state: formData.state,

      latitude: formData.latitude
        ? Number(formData.latitude)
        : null,

      longitude: formData.longitude
        ? Number(formData.longitude)
        : null,

      gender: formData.gender,

securityDeposit: formData.securityDeposit
  ? Number(formData.securityDeposit)
  : null,

availabilityStatus:
  formData.availabilityStatus,

contactNumber:
  formData.contactNumber,

foodDetails:
  formData.foodDetails,

securityDetails:
  formData.securityDetails,

houseRules:
  formData.houseRules,

rooms: rooms.map((room) => ({
  roomType: room.roomType,
  price: Number(room.price),
})),

amenityIds: selectedAmenities,
    };

    const isEditMode = Boolean(propertyToEdit);

    const url = isEditMode
      ? `http://localhost:5000/api/properties/${propertyToEdit.id}`
      : "http://localhost:5000/api/properties";

    const method = isEditMode
      ? "PUT"
      : "POST";

    const response = await fetch(url, {
  method,
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  },
  body: JSON.stringify(requestBody),
});

const data = await response.json();

if (!response.ok || !data.success) {
  throw new Error(
    data.message ||
      (isEditMode
        ? "Failed to update property"
        : "Failed to submit property")
  );
}

const savedPropertyId =
  data.property?.id ||
  propertyToEdit?.id;

if (!savedPropertyId) {
  throw new Error(
    "Property was saved but its ID could not be determined."
  );
}

if (selectedImages.length > 0) {
  setImageUploadLoading(true);
  setImageUploadError("");

  try {
    const imageFormData = new FormData();

    selectedImages.forEach((image) => {
      imageFormData.append("images", image.file);
    });

    const imageResponse = await fetch(
      `http://localhost:5000/api/properties/${savedPropertyId}/images`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: imageFormData,
      }
    );

    const imageData = await imageResponse.json();

    if (!imageResponse.ok || !imageData.success) {
      throw new Error(
        imageData.message ||
          "Property saved, but image upload failed."
      );
    }
  } catch (imageError) {
    console.error(
      "Failed to upload property images:",
      imageError
    );

    setImageUploadError(
      imageError.message ||
        "Property was saved, but some images could not be uploaded."
    );
  } finally {
    setImageUploadLoading(false);
  }
}

    

    setMessage(
      isEditMode
        ? "Property updated successfully! It is now pending verification."
        : "Property submitted successfully! It is now pending verification."
    );

   setFormData({
  name: "",
  type: "PG",
  description: "",
  collegeId: "",
  address: "",
  city: "",
  state: "",
  postalCode: "",
  latitude: "",
  longitude: "",
  gender: "UNISEX",
  securityDeposit: "",
  availabilityStatus: "AVAILABLE",

  contactNumber: "",
  foodDetails: "",
  securityDetails: "",
  houseRules: "",
});

    setRooms([
      {
        roomType: "SINGLE",
        price: "",
        capacity: 1,
        availableBeds: "",
      },
    ]);

    setSelectedCollege(null);
    setSelectedLocation(null);

    if (isEditMode && onClose) {
      setTimeout(() => {
        onClose();
      }, 1200);
    }
  } catch (error) {
    console.error(
      "Failed to save property:",
      error
    );

    setError(
      error.message ||
        "Unable to save property right now."
    );
  } finally {
    setLoading(false);
  }
};

  return (
    <section className="add-property-page">
      <div className="add-property-container">
        <div className="add-property-header">
          <span className="add-property-eyebrow">
            OWNER PORTAL
          </span>

          <h1>List Your Property</h1>

          <p>
            Add your PG, hostel or co-living property
            and reach students looking for accommodation.
          </p>
        </div>

        <form
          className="add-property-form"
          onSubmit={handleSubmit}
        >
          <div className="form-section">
            <div className="form-section-heading">
              <span>01</span>

              <div>
                <h2>Basic Information</h2>
                <p>
                  Tell students about your property.
                </p>
              </div>
            </div>

            <div className="form-grid">
              <div className="form-field form-field-full">
                <label htmlFor="name">
                  Property Name
                </label>

                <input
                  id="name"
                  name="name"
                  type="text"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="e.g. Campus Comfort PG"
                  required
                />
              </div>

              <div className="form-field">
                <label htmlFor="type">
                  Property Type
                </label>

                <select
                  id="type"
                  name="type"
                  value={formData.type}
                  onChange={handleChange}
                  required
                >
                  <option value="PG">PG</option>
                  <option value="HOSTEL">Hostel</option>
                  <option value="CO_LIVING">
                    Co-living
                  </option>
                </select>
              </div>

              <div className="form-field">
                <label htmlFor="gender">
                  Preferred Gender
                </label>

                <select
                  id="gender"
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                  required
                >
                  <option value="UNISEX">
                    Unisex
                  </option>
                  <option value="MALE">
                    Male
                  </option>
                  <option value="FEMALE">
                    Female
                  </option>
                </select>
              </div>

              <div className="form-field form-field-full">
                <label htmlFor="description">
                  Description
                </label>

                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Describe your property, rooms, surroundings and what makes it suitable for students..."
                  rows="5"
                />
              </div>
            </div>
          </div>

          <div className="form-section">
            <div className="form-section-heading">
              <span>02</span>

              <div>
                <h2>Location</h2>
                <p>
                  Help students find your property easily.
                </p>
              </div>
            </div>

           <div className="location-picker-section">
  <div className="location-picker-heading">
    <div>
      <h3>📍 Find Property Location</h3>

      <p>
        Enter your complete property address above and
        click the button below to locate it on the map.
      </p>
    </div>

    {selectedLocation && (
      <span className="location-selected-badge">
        ✓ Location found
      </span>
    )}
  </div>

  <button
    type="button"
    className="find-location-button"
    onClick={handleFindLocation}
    disabled={locationLoading}
  >
    {locationLoading
      ? "Finding location..."
      : "📍 Find Location on Map"}
  </button>

  {locationError && (
    <div className="location-error">
      {locationError}
    </div>
  )}

  <div className="property-location-map">
    <MapContainer
     center={
  selectedLocation ||
  collegeLocation ||
  [28.4744, 77.5040]
}
      zoom={
  selectedLocation
    ? 16
    : collegeLocation
    ? 15
    : 12
}
      scrollWheelZoom={true}
      style={{
        height: "380px",
        width: "100%",
      }}
      key={
        selectedLocation
          ? selectedLocation.join("-")
          : "default-map"
      }
    >
      <TileLayer
        attribution="&copy; OpenStreetMap contributors"
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      <LocationPicker
      position={selectedLocation}
  onLocationSelect={handleLocationSelect}
/>

{collegeLocation && (
  <Marker position={collegeLocation}>
    <Tooltip
      permanent
      direction="top"
      offset={[0, -10]}
      opacity={1}
    >
      <div className="property-map-tooltip">
        <strong>🎓 {selectedCollege.name}</strong>

        <span>
          {selectedCollege.city}
          {selectedCollege.state
            ? `, ${selectedCollege.state}`
            : ""}
        </span>

        <span>College / University</span>
      </div>
    </Tooltip>
  </Marker>
)}

     {selectedLocation && (
  <Marker position={selectedLocation}>
    <Tooltip
      permanent
      direction="top"
      offset={[0, -10]}
      opacity={1}
    >
      <div className="property-map-tooltip">
        <strong>
          {formData.name || "Your Property"}
        </strong>

        <span>
          {formData.address || "Property address"}
        </span>

        {(formData.city || formData.state || formData.postalCode) && (
          <span>
            {[
              formData.city,
              formData.state,
              formData.postalCode,
            ]
              .filter(Boolean)
              .join(", ")}
          </span>
        )}
      </div>
    </Tooltip>
  </Marker>
)}
    </MapContainer>
  </div>

  {selectedLocation && (
    <div className="selected-location-info">
  <div>
    <span>Latitude</span>
    <strong>{formData.latitude}</strong>
  </div>

  <div>
    <span>Longitude</span>
    <strong>{formData.longitude}</strong>
  </div>

  {distanceFromCollege !== null && (
    <div>
      <span>Distance from College</span>
      <strong>
        {distanceFromCollege < 1
          ? `${(distanceFromCollege * 1000).toFixed(0)} m`
          : `${distanceFromCollege.toFixed(2)} km`}
      </strong>
    </div>
  )}
</div>
  )}
</div>

            <div className="form-grid">
              <div className="form-field form-field-full college-selector-field">
  <label htmlFor="collegeSearch">
    Nearby College / University
  </label>

  <div className="college-search-wrapper">
    <input
      id="collegeSearch"
      name="collegeId"
      type="text"
      value={
        selectedCollege
          ? selectedCollege.name
          : formData.collegeId
      }
      onChange={(event) => {
        setSelectedCollege(null);

        setFormData((previousData) => ({
          ...previousData,
          collegeId: event.target.value,
        }));
      }}
      placeholder="Search your nearby college..."
      autoComplete="off"
      required
    />

    {collegeLoading && (
      <div className="college-search-status">
        Searching colleges...
      </div>
    )}

    {!collegeLoading &&
      collegeSuggestions.length > 0 &&
      !selectedCollege && (
        <div className="college-suggestions">
          {collegeSuggestions.map((college) => (
            <button
              key={college.id}
              type="button"
              className="college-suggestion-item"
              onClick={() => handleCollegeSelect(college)}
            >
              <strong>{college.name}</strong>

              <span>
                {college.city}
                {college.state
                  ? `, ${college.state}`
                  : ""}
              </span>
            </button>
          ))}
        </div>
      )}
  </div>

  {selectedCollege && (
    <div className="selected-college-info">
      <span>✓ Selected</span>
      <strong>{selectedCollege.name}</strong>
    </div>
  )}
</div>
              <div className="form-field form-field-full">
                <label htmlFor="address">
                  Full Address
                </label>

                <input
                  id="address"
                  name="address"
                  type="text"
                  value={formData.address}
                  onChange={handleChange}
                  placeholder="House no., street, area"
                  required
                />
              </div>

              <div className="form-field">
                <label htmlFor="city">
                  City
                </label>

                <input
                  id="city"
                  name="city"
                  type="text"
                  value={formData.city}
                  onChange={handleChange}
                  placeholder="Bengaluru"
                  required
                />
              </div>

              <div className="form-field">
  <label htmlFor="state">
    State
  </label>

  <input
    id="state"
    name="state"
    type="text"
    value={formData.state}
    onChange={handleChange}
    placeholder="Uttar Pradesh"
    required
  />
</div>

<div className="form-field">
  <label htmlFor="postalCode">
    PIN Code
  </label>

  <input
    id="postalCode"
    name="postalCode"
    type="text"
    inputMode="numeric"
    maxLength="6"
    value={formData.postalCode}
    onChange={handleChange}
    placeholder="201310"
    required
  />
</div>

            </div>
          </div>

        <div className="form-section">
  <div className="form-section-heading">
    <span>03</span>

    <div>
      <h2>Property Photos</h2>
      <p>
        Add clear photos of your property, rooms and common areas.
      </p>
    </div>
  </div>

  <div className="property-image-upload-section">
    <div className="property-image-upload-header">
      <div>
        <h3>📸 Property Gallery</h3>
        <p>
          Upload up to 10 photos. The first photo will be used as
          your property's primary image.
        </p>
      </div>

      <span className="property-image-count">
        {existingImages.length + selectedImages.length}/10
      </span>
    </div>

    <label
      htmlFor="propertyImages"
      className="property-image-dropzone"
    >
      <div className="property-image-upload-icon">
        ↑
      </div>

      <strong>Click to upload property photos</strong>

      <span>
        JPG, PNG or WebP · Maximum 5 MB per image
      </span>

      <span className="property-image-upload-button">
        Choose Photos
      </span>

      <input
        id="propertyImages"
        type="file"
        accept="image/jpeg,image/jpg,image/png,image/webp"
        multiple
        onChange={handleImageSelect}
        hidden
      />
    </label>

    {imageUploadError && (
      <div className="form-error property-image-error">
        {imageUploadError}
      </div>
    )}

    {(existingImages.length > 0 ||
      selectedImages.length > 0) && (
      <div className="property-image-grid">
        {existingImages.map((image, index) => (
          <div
            className="property-image-preview-card"
            key={`existing-${image.id}`}
          >
            <img
              src={image.image_url}
              alt={`Property ${index + 1}`}
            />

            {image.is_primary && (
              <span className="property-primary-badge">
                Primary
              </span>
            )}

            <span className="property-image-number">
              {index + 1}
            </span>
          </div>
        ))}

        {selectedImages.map((image, index) => (
          <div
            className="property-image-preview-card"
            key={image.id}
          >
            <img
              src={image.preview}
              alt={`Selected property ${index + 1}`}
            />

            {existingImages.length === 0 && index === 0 && (
              <span className="property-primary-badge">
                Primary
              </span>
            )}

            <button
              type="button"
              className="property-image-remove-button"
              onClick={() => removeSelectedImage(image.id)}
              aria-label="Remove image"
            >
              ×
            </button>
          </div>
        ))}
      </div>
    )}
  </div>
</div>

<div className="form-section">
  <div className="form-section-heading">
    <span>04</span>
    <div>
      <h2>Stay Information</h2>
      <p>
        Add important information that helps students and parents
        understand the stay experience.
      </p>
    </div>
  </div>

  <div className="form-grid">

    {/* Contact Number */}
    <div className="form-group">
      <label htmlFor="contactNumber">
        Contact Number
      </label>

      <input
        id="contactNumber"
        type="tel"
        value={formData.contactNumber}
        onChange={(event) =>
          setFormData((previous) => ({
            ...previous,
            contactNumber: event.target.value,
          }))
        }
        placeholder="Enter property contact number"
      />

      <small>
        Students can use this number to contact the property owner.
      </small>
    </div>

    {/* Food & Meals */}
    <div className="form-group">
      <label htmlFor="foodDetails">
        Food & Meals
      </label>

      <input
        id="foodDetails"
        type="text"
        value={formData.foodDetails}
        onChange={(event) =>
          setFormData((previous) => ({
            ...previous,
            foodDetails: event.target.value,
          }))
        }
        placeholder="e.g. Vegetarian meals included"
      />
    </div>

    {/* Security */}
    <div className="form-group">
      <label htmlFor="securityDetails">
        Security
      </label>

      <input
        id="securityDetails"
        type="text"
        value={formData.securityDetails}
        onChange={(event) =>
          setFormData((previous) => ({
            ...previous,
            securityDetails: event.target.value,
          }))
        }
        placeholder="e.g. 24x7 security + CCTV"
      />
    </div>

    {/* House Rules */}
    <div className="form-group form-group-full">
      <label htmlFor="houseRules">
        House Rules
      </label>

      <textarea
        id="houseRules"
        value={formData.houseRules}
        onChange={(event) =>
          setFormData((previous) => ({
            ...previous,
            houseRules: event.target.value,
          }))
        }
        placeholder="e.g. No smoking, no pets, entry before 10 PM..."
        rows={4}
      />
    </div>

  </div>
</div>

{/* ==================== AMENITIES ==================== */}

<div className="form-section">
  <div className="form-section-heading">
    <span>05</span>

    <div>
      <h2>Amenities</h2>
      <p>
        Select the facilities and services available at this
        property.
      </p>
    </div>
  </div>

  <div className="amenities-selection">

    {amenitiesLoading && (
      <div className="amenities-status">
        Loading amenities...
      </div>
    )}

    {amenitiesError && (
      <div className="amenities-status amenities-error">
        {amenitiesError}
      </div>
    )}

    {!amenitiesLoading &&
      !amenitiesError &&
      amenities.length === 0 && (
        <div className="amenities-status">
          No amenities available.
        </div>
      )}

    {!amenitiesLoading &&
      !amenitiesError &&
      amenities.length > 0 && (
        <div className="amenities-grid">
          {amenities.map((amenity) => {
            const isSelected = selectedAmenities.includes(
              Number(amenity.id)
            );

            return (
              <button
                key={amenity.id}
                type="button"
                className={`amenity-option ${
                  isSelected ? "selected" : ""
                }`}
                onClick={() =>
                  handleAmenityToggle(amenity.id)
                }
              >
                <span className="amenity-check">
                  {isSelected ? "✓" : ""}
                </span>

                <span className="amenity-name">
                  {amenity.name}
                </span>
              </button>
            );
          })}
        </div>
      )}

  </div>
</div>

<div className="form-section">
  <div className="form-section-heading">
    <span>06</span>

              <div>
                <h2>Pricing & Availability</h2>
                <p>
                  Add basic financial and availability
                  information.
                </p>
              </div>
            </div>

            <div className="form-grid">

  <div className="form-field">
    <label htmlFor="securityDeposit">
      Security Deposit
    </label>

    <input
      id="securityDeposit"
      name="securityDeposit"
      type="number"
      min="0"
      value={formData.securityDeposit}
      onChange={handleChange}
      placeholder="8000"
    />
  </div>

  <div className="form-field">
    <label htmlFor="availabilityStatus">
      Availability
    </label>

    <select
      id="availabilityStatus"
      name="availabilityStatus"
      value={formData.availabilityStatus}
      onChange={handleChange}
    >
      <option value="AVAILABLE">
        Available
      </option>

      <option value="LIMITED">
        Limited Availability
      </option>

      <option value="FULL">
        Full
      </option>
    </select>
  </div>

</div>

<div className="room-options-section">

  <div className="room-options-heading">
    <div>
      <h3>🛏️ Room Options</h3>

      <p>
        Add the room types, monthly rent and available
        beds for this property.
      </p>
    </div>

    <button
      type="button"
      className="add-room-button"
      onClick={addRoom}
    >
      ＋ Add Room
    </button>
  </div>

  <div className="room-options-list">

    {rooms.map((room, index) => (
      <div
        className="room-option-card"
        key={index}
      >

        <div className="room-option-card-header">
          <div>
            <span>
              ROOM {index + 1}
            </span>

            <strong>
              {room.roomType === "SINGLE"
                ? "Single Room"
                : room.roomType === "DOUBLE"
                ? "Double Sharing"
                : room.roomType === "TRIPLE"
                ? "Triple Sharing"
                : "Four Sharing"}
            </strong>
          </div>

          {rooms.length > 1 && (
            <button
              type="button"
              className="remove-room-button"
              onClick={() => removeRoom(index)}
            >
              Remove
            </button>
          )}
        </div>

        <div className="room-option-grid">

          <div className="form-field">
            <label>
              Room Type
            </label>

            <select
              value={room.roomType}
              onChange={(event) =>
                handleRoomChange(
                  index,
                  "roomType",
                  event.target.value
                )
              }
            >
              <option value="SINGLE">
                Single
              </option>

              <option value="DOUBLE">
                Double Sharing
              </option>

              <option value="TRIPLE">
                Triple Sharing
              </option>

              <option value="FOUR">
                Four Sharing
              </option>
            </select>
          </div>

          <div className="form-field">
            <label>
              Monthly Rent
            </label>

            <input
              type="number"
              min="0"
              value={room.price}
              onChange={(event) =>
                handleRoomChange(
                  index,
                  "price",
                  event.target.value
                )
              }
              placeholder="e.g. 6500"
              required
            />
          </div>

        

        </div>

      </div>
    ))}

  </div>

</div>
          </div>

          {message && (
            <div className="form-success">
              ✓ {message}
            </div>
          )}

          {error && (
            <div className="form-error">
              {error}
            </div>
          )}

          <div className="form-submit-area">
            <div>
              <strong>
                Your listing will be reviewed
              </strong>

              <p>
                New properties are submitted as pending
                until they are verified.
              </p>
            </div>

            <button
              type="submit"
              className="add-property-submit"
              disabled={loading}
            >
              {loading
                ? "Submitting..."
                : "Submit Property →"}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default AddProperty;
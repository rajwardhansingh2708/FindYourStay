import { useEffect, useState } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap,
} from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "./App.css";
import PropertyCard from "./components/PropertyCard";
import AddProperty from "./components/AddProperty";

const demoProperties = [
  {
    id: 1,
name: "Maple Student House",
type: "PG",
location: "Koramangala, Bengaluru",
college: "Christ University",
latitude: 12.9348,
longitude: 77.6101,
distanceFromCollege: 1.2,
rating: 4.8,
reviews: 124,
availability: "Available now",
tag: "POPULAR",
amenities: [
  "Wi-Fi",
  "AC",
  "Food",
  "Laundry",
  "Housekeeping",
  "Power backup",
],
    image:
  "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?auto=format&fit=crop&w=900&q=85",
gallery: [
  "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?auto=format&fit=crop&w=1200&q=90",
  "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=1200&q=90",
  "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1200&q=90",
  "https://images.unsplash.com/photo-1493809842364-78817add7ffb?auto=format&fit=crop&w=1200&q=90",
],
    rooms: [
      {
        id: "maple-single",
        type: "Single",
        shortLabel: "1 sharing",
        price: 12000,
      },
      {
        id: "maple-double",
        type: "Double",
        shortLabel: "2 sharing",
        price: 9000,
      },
      {
        id: "maple-triple",
        type: "Triple",
        shortLabel: "3 sharing",
        price: 7500,
      },
      {
        id: "maple-four",
        type: "Four Sharing",
        shortLabel: "4 sharing",
        price: 6500,
      },
    ],
  },

  {
    id: 2,
    
name: "UrbanNest Student Living",
type: "Co-living",
location: "HSR Layout, Bengaluru",
college: "Christ University",
latitude: 12.9121,
longitude: 77.6446,
distanceFromCollege: 3.8,
rating: 4.7,
reviews: 98,
availability: "3 rooms left",
tag: "VERIFIED",
amenities: [
  "Wi-Fi",
  "AC",
  "Food",
  "Laundry",
  "Gym",
  "Housekeeping",
],
details: {
  food: "Breakfast & dinner included",
  security: "24/7 security, CCTV & biometric entry",
  deposit: "₹10,000 refundable deposit",
  rules: "Visitors allowed until 9 PM • No smoking",
},
    image:
  "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=900&q=85",
gallery: [
  "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=1200&q=90",
  "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=1200&q=90",
  "https://images.unsplash.com/photo-1493809842364-78817add7ffb?auto=format&fit=crop&w=1200&q=90",
  "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1200&q=90",
],
    rooms: [
      {
        id: "urbannest-single",
        type: "Single",
        shortLabel: "1 sharing",
        price: 14500,
      },
      {
        id: "urbannest-double",
        type: "Double",
        shortLabel: "2 sharing",
        price: 10500,
      },
      {
        id: "urbannest-triple",
        type: "Triple",
        shortLabel: "3 sharing",
        price: 8500,
      },
    ],
  },

  {
    id: 3,
name: "The Student Village",
type: "Hostel",
location: "BTM Layout, Bengaluru",
college: "Christ University",
latitude: 12.9121,
longitude: 77.6446,
distanceFromCollege: 2.6,
rating: 4.6,
reviews: 87,
availability: "Available now",
tag: "VALUE PICK",
amenities: [
  "Wi-Fi",
  "Food",
  "Laundry",
  "CCTV",
  "Housekeeping",
  "Power backup",
],
details: {
  food: "Breakfast, lunch & dinner included",
  security: "24/7 security & CCTV",
  deposit: "1 month security deposit",
  rules: "No smoking • No alcohol • Visitors allowed",
},
details: {
  food: "Homely vegetarian meals available",
  security: "24/7 security & CCTV surveillance",
  deposit: "₹8,000 refundable deposit",
  rules: "No smoking • Quiet hours after 10:30 PM",
},
    image:
  "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=900&q=85",
gallery: [
  "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1200&q=90",
  "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?auto=format&fit=crop&w=1200&q=90",
  "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=1200&q=90",
  "https://images.unsplash.com/photo-1560185008-b033106af5c3?auto=format&fit=crop&w=1200&q=90",
],
    rooms: [
      {
        id: "village-double",
        type: "Double",
        shortLabel: "2 sharing",
        price: 9000,
      },
      {
        id: "village-triple",
        type: "Triple",
        shortLabel: "3 sharing",
        price: 7600,
      },
      {
        id: "village-four",
        type: "Four Sharing",
        shortLabel: "4 sharing",
        price: 6800,
      },
      {
        id: "village-six",
        type: "Six Sharing",
        shortLabel: "6 sharing",
        price: 5500,
      },
    ],
  },

  {
   id: 4,
   
name: "Campus Comfort PG",
type: "PG",
location: "Electronic City, Bengaluru",
college: "PES University",
latitude: 12.8458,
longitude: 77.6600,
distanceFromCollege: 1.4,
rating: 4.5,
reviews: 73,
availability: "5 rooms left",
tag: "BUDGET",
amenities: [
  "Wi-Fi",
  "Food",
  "AC",
  "CCTV",
  "Parking",
  "Power backup",
],
details: {
  food: "Breakfast & dinner available",
  security: "CCTV surveillance & secure entry",
  deposit: "₹7,000 refundable deposit",
  rules: "Visitors allowed • No smoking inside rooms",
},
    image:
  "https://images.unsplash.com/photo-1493809842364-78817add7ffb?auto=format&fit=crop&w=900&q=85",
gallery: [
  "https://images.unsplash.com/photo-1493809842364-78817add7ffb?auto=format&fit=crop&w=1200&q=90",
  "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=1200&q=90",
  "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?auto=format&fit=crop&w=1200&q=90",
  "https://images.unsplash.com/photo-1560185008-b033106af5c3?auto=format&fit=crop&w=1200&q=90",
],
    rooms: [
      {
        id: "campus-double",
        type: "Double",
        shortLabel: "2 sharing",
        price: 7800,
      },
      {
        id: "campus-triple",
        type: "Triple",
        shortLabel: "3 sharing",
        price: 6800,
      },
      {
        id: "campus-four",
        type: "Four Sharing",
        shortLabel: "4 sharing",
        price: 6100,
      },
      {
        id: "campus-six",
        type: "Six Sharing",
        shortLabel: "6 sharing",
        price: 5200,
      },
    ],
  },

  {
    id: 5,
name: "Olive Co-Living",
type: "Co-living",
location: "Indiranagar, Bengaluru",
college: "Christ University",
latitude: 12.8458,
longitude: 77.6600,
distanceFromCollege: 5.1,
rating: 4.9,
reviews: 156,
availability: "Available now",
tag: "TOP RATED",
amenities: [
  "Wi-Fi",
  "AC",
  "Food",
  "Gym",
  "Laundry",
  "Housekeeping",
],
details: {
  food: "Breakfast, lunch & dinner included",
  security: "24/7 security & smart access",
  deposit: "₹15,000 refundable deposit",
  rules: "Visitors allowed • No smoking • No alcohol",
},
    image:
  "https://images.unsplash.com/photo-1560185008-b033106af5c3?auto=format&fit=crop&w=900&q=85",
gallery: [
  "https://images.unsplash.com/photo-1560185008-b033106af5c3?auto=format&fit=crop&w=1200&q=90",
  "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=1200&q=90",
  "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1200&q=90",
  "https://images.unsplash.com/photo-1493809842364-78817add7ffb?auto=format&fit=crop&w=1200&q=90",
],
    rooms: [
      {
        id: "olive-single",
        type: "Single",
        shortLabel: "1 sharing",
        price: 15500,
      },
      {
        id: "olive-double",
        type: "Double",
        shortLabel: "2 sharing",
        price: 11500,
      },
    ],
  },

  {
    id: 6,
    
name: "NestAway Student Homes",
type: "Hostel",
location: "Marathahalli, Bengaluru",
college: "PES University",
latitude: 12.9568,
longitude: 77.7010,
distanceFromCollege: 4.7,
rating: 4.6,
reviews: 112,
availability: "2 rooms left",
tag: "NEW",
amenities: [
  "Wi-Fi",
  "Food",
  "Laundry",
  "CCTV",
  "Housekeeping",
  "Power backup",
],
details: {
  food: "Breakfast & dinner included",
  security: "24/7 security & CCTV",
  deposit: "₹9,000 refundable deposit",
  rules: "No smoking • Visitors allowed until 9 PM",
},
    image:
  "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=900&q=85",
gallery: [
  "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=1200&q=90",
  "https://images.unsplash.com/photo-1493809842364-78817add7ffb?auto=format&fit=crop&w=1200&q=90",
  "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?auto=format&fit=crop&w=1200&q=90",
  "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1200&q=90",
],
    rooms: [
      {
        id: "nestaway-single",
        type: "Single",
        shortLabel: "1 sharing",
        price: 11000,
      },
      {
        id: "nestaway-double",
        type: "Double",
        shortLabel: "2 sharing",
        price: 8500,
      },
      {
        id: "nestaway-triple",
        type: "Triple",
        shortLabel: "3 sharing",
        price: 7500,
      },
      {
        id: "nestaway-four",
        type: "Four Sharing",
        shortLabel: "4 sharing",
        price: 6500,
      },
    ],
  },
];


const colleges = [
  {
    id: 1,
    

    name: "Christ University",
    city: "Bengaluru",
  },
  {
    id: 2,
    name: "PES University",
    city: "Bengaluru",
  },
  {
    id: 3,
    
    name: "RV College of Engineering",
    city: "Bengaluru",
  },
  {
    id: 4,
    name: "Galgotias University",
    city: "Greater Noida",
  },
  {
    id: 5,
    
    name: "Amity University",
    city: "Noida",
  },
];

const exploreFilters = [
  "All stays",
  "PG",
  "Hostel",
  "Co-living",
  "Under ₹8k",
];

const distanceFilters = [
  "All distances",
  "Within 1 km",
  "Within 3 km",
  "Within 5 km",
];


const normalizePropertyFromApi = (apiProperty) => {
  const demoProperty = demoProperties.find(
    (property) => property.id === apiProperty.id
  );

  const typeMap = {
    PG: "PG",
    HOSTEL: "Hostel",
    CO_LIVING: "Co-living",
  };

  const verificationStatus =
    apiProperty.verification_status || "PENDING";

  const isVerified =
    verificationStatus === "VERIFIED";

  const normalizedRooms = Array.isArray(apiProperty.rooms)
    ? apiProperty.rooms.map((room) => ({
        id: room.id,

        type: room.room_type
          .replace(" Sharing", "")
          .replace(" Room", ""),

        shortLabel:
          room.room_type === "Single Room"
            ? "1 sharing"
            : room.room_type === "Double Sharing"
              ? "2 sharing"
              : room.room_type === "Triple Sharing"
                ? "3 sharing"
                : room.room_type,

        price: Number(room.price),

        totalBeds: room.total_beds,

        availableBeds: room.available_beds,

        hasAC: room.has_ac,
      }))
    : [];

  const normalizedAmenities = Array.isArray(
    apiProperty.amenities
  )
    ? apiProperty.amenities.map((amenity) =>
        amenity.name === "Power Backup"
          ? "Power backup"
          : amenity.name
      )
    : [];

    const normalizedDetails = {
  food:
    apiProperty.food_details ||
    apiProperty.foodDetails ||
    demoProperty?.details?.food ||
    "Information unavailable",

  security:
    apiProperty.security_details ||
    apiProperty.securityDetails ||
    demoProperty?.details?.security ||
    "Information unavailable",

  deposit:
    apiProperty.security_deposit !== null &&
    apiProperty.security_deposit !== undefined
      ? `₹${Number(
          apiProperty.security_deposit
        ).toLocaleString("en-IN")} refundable deposit`
      : demoProperty?.details?.deposit ||
        "Information unavailable",

  rules:
    apiProperty.house_rules ||
    apiProperty.houseRules ||
    demoProperty?.details?.rules ||
    "Information unavailable",
};

  const normalizedImages = Array.isArray(
    apiProperty.images
  )
    ? [...apiProperty.images].sort((a, b) => {
        if (a.is_primary !== b.is_primary) {
          return a.is_primary ? -1 : 1;
        }

        return (
          Number(a.display_order || 0) -
          Number(b.display_order || 0)
        );
      })
    : [];

  const primaryImage =
    normalizedImages.find(
      (image) => image.is_primary
    ) ||
    normalizedImages[0] ||
    null;

  return {
    /*
     * Demo properties ke liye existing UI data preserve rahega.
     * Real/new DB properties ko fake demo metadata nahi milega.
     */
    ...(demoProperty || {}),

    id: apiProperty.id,

    ownerId: Number(apiProperty.owner_id),

    collegeId: Number(apiProperty.college_id),

    name: apiProperty.name,

    type:
      typeMap[apiProperty.type] || apiProperty.type,

    description: apiProperty.description || "",

    address: apiProperty.address || "",

    city: apiProperty.city || "",

    state: apiProperty.state || "",

    location:
      apiProperty.address && apiProperty.city
        ? `${apiProperty.address}, ${apiProperty.city}`
        : apiProperty.city ||
          apiProperty.address ||
          "",

    college: apiProperty.college_name || "",

    collegeName:
      apiProperty.college_name || "",

    latitude:
      apiProperty.latitude !== null &&
      apiProperty.latitude !== undefined
        ? Number(apiProperty.latitude)
        : null,

    longitude:
      apiProperty.longitude !== null &&
      apiProperty.longitude !== undefined
        ? Number(apiProperty.longitude)
        : null,

    distanceFromCollege:
      apiProperty.distance_km !== null &&
      apiProperty.distance_km !== undefined
        ? Number(apiProperty.distance_km)
        : null,

    gender:
      apiProperty.gender || "UNISEX",

    securityDeposit:
      apiProperty.security_deposit !== null &&
      apiProperty.security_deposit !== undefined
        ? Number(apiProperty.security_deposit)
        : null,

    availabilityStatus:
      apiProperty.availability_status ||
      "AVAILABLE",

    availability:
      apiProperty.availability_status ===
      "AVAILABLE"
        ? "Available now"
        : apiProperty.availability_status ===
            "LIMITED"
          ? "Limited availability"
          : "Currently full",

    verificationStatus,

    /*
     * Only VERIFIED properties get verified status.
     * New properties remain pending.
     */
    verified: isVerified,

    /*
     * Cloudinary property images.
     *
     * Primary image card par show hogi.
     * Saari images gallery ke liye available rahengi.
     */
    image:
      primaryImage?.image_url ||
      demoProperty?.image ||
      null,

    gallery:
      normalizedImages.length > 0
        ? normalizedImages.map(
            (image) => image.image_url
          )
        : demoProperty?.gallery || [],

    images: normalizedImages,

    /*
     * Demo properties can keep their existing
     * rating/review data.
     * New properties start with no reviews.
     */
    rating: demoProperty?.rating ?? null,

    reviews: demoProperty?.reviews ?? 0,

    /*
     * Popular badge sirf demo property ke
     * existing data se aayega.
     */
    tag: demoProperty?.tag ?? null,

    isPopular:
      demoProperty?.isPopular ?? false,

    rooms: normalizedRooms,

    amenities: normalizedAmenities,

details: normalizedDetails,

contactNumber:
  apiProperty.contact_number ||
  apiProperty.contactNumber ||
  demoProperty?.contactNumber ||
  "",
  };
};

function App() {
 const [properties, setProperties] = useState(demoProperties);
const [loadingProperties, setLoadingProperties] = useState(false);
const [propertiesError, setPropertiesError] = useState("");
const [propertiesRefreshKey, setPropertiesRefreshKey] = useState(0);

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        setLoadingProperties(true);
        setPropertiesError("");

        const response = await fetch(
          "http://localhost:5000/api/properties"
        );

        if (!response.ok) {
          throw new Error("Failed to fetch properties");
        }

        const data = await response.json();
        console.log("PROPERTY API DATA:", data.properties);

        if (!data.success) {
          throw new Error("Backend returned an error");
        }

        const normalizedProperties = data.properties.map(
          normalizePropertyFromApi
        );

        setProperties(normalizedProperties);
      } catch (error) {
        console.error("Failed to load properties:", error);
        setPropertiesError(
          "Unable to load properties from server."
        );
      } finally {
        setLoadingProperties(false);
      }
    };

    fetchProperties();
  }, [propertiesRefreshKey]);


  const [activeFilter, setActiveFilter] = useState("All stays");
const [activeDistanceFilter, setActiveDistanceFilter] = useState("All distances");
const [savedProperties, setSavedProperties] = useState([]);
const [showSavedStays, setShowSavedStays] = useState(false);
const [compareProperties, setCompareProperties] = useState([]);

  const [sortOptions, setSortOptions] = useState([
  "nearest",
]);
const [searchQuery, setSearchQuery] = useState("");


const [selectedStayType, setSelectedStayType] = useState("");

const [activeSearch, setActiveSearch] = useState("");

useEffect(() => {
  const searchColleges = async () => {
    const query = searchQuery.trim();

    if (!query) {
      setCollegeSuggestions([]);
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:5000/api/colleges?search=${encodeURIComponent(
          query
        )}`
      );

      if (!response.ok) {
        throw new Error("Failed to search colleges");
      }

      const data = await response.json();

      if (!data.success) {
        throw new Error("Backend returned an error");
      }

      setCollegeSuggestions(data.colleges);
    } catch (error) {
      console.error(
        "Failed to search colleges:",
        error
      );

      setCollegeSuggestions([]);
    }
  };

  searchColleges();
}, [searchQuery]);

const fetchPropertiesByCollege = async (collegeId) => {
  try {
    setLoadingProperties(true);
    setPropertiesError("");

    const response = await fetch(
      `http://localhost:5000/api/properties?collegeId=${collegeId}`
    );

    if (!response.ok) {
      throw new Error("Failed to fetch properties");
    }

    const data = await response.json();

    if (!data.success) {
      throw new Error("Backend returned an error");
    }

    const normalizedProperties = data.properties.map(
      normalizePropertyFromApi
    );

    setProperties(normalizedProperties);
  } catch (error) {
    console.error(
      "Failed to load college properties:",
      error
    );

    setPropertiesError(
      "Unable to load properties for this college."
    );
  } finally {
    setLoadingProperties(false);
  }
};

const [selectedCollege, setSelectedCollege] = useState(null);

const [showCollegeSuggestions, setShowCollegeSuggestions] =
  useState(false);

const [selectedProperty, setSelectedProperty] = useState(null);
const [showPropertyDetails, setShowPropertyDetails] = useState(false);

const [showPropertyMap, setShowPropertyMap] = useState(false);

const [selectedGalleryImage, setSelectedGalleryImage] = useState(0);
const [showOwnerContact, setShowOwnerContact] = useState(false);
const [showComparePanel, setShowComparePanel] = useState(false);
const [showAuthModal, setShowAuthModal] = useState(false);
const [authMode, setAuthMode] = useState("login");
const [authLoading, setAuthLoading] = useState(false);
const [authError, setAuthError] = useState("");
const [authMessage, setAuthMessage] = useState("");
const [isLoggedIn, setIsLoggedIn] = useState(
  Boolean(localStorage.getItem("findYourHostelToken"))
);

const [currentUser, setCurrentUser] = useState(() => {
  const savedUser = localStorage.getItem("findYourHostelUser");

  try {
    return savedUser ? JSON.parse(savedUser) : null;
  } catch {
    return null;
  }
});
const [showAddProperty, setShowAddProperty] = useState(false);
const [showOwnerDashboard, setShowOwnerDashboard] = useState(false);
const [showMyProperties, setShowMyProperties] = useState(false);
const [propertyToEdit, setPropertyToEdit] = useState(null);
const [propertyToDelete, setPropertyToDelete] = useState(null);
const [deleteLoading, setDeleteLoading] = useState(false);
const [deleteError, setDeleteError] = useState("");
const [myProperties, setMyProperties] = useState([]);
const [myPropertiesLoading, setMyPropertiesLoading] = useState(false);

useEffect(() => {
  if (isLoggedIn && showOwnerDashboard) {
    fetchMyProperties();
  }
}, [isLoggedIn, showOwnerDashboard]);

const featuredProperty = properties[0];




 const [collegeSuggestions, setCollegeSuggestions] = useState([]);

  const filteredProperties = properties.filter((property) => {
    const query = activeSearch.trim().toLowerCase();

    const matchesSearch =
  query === "" ||
  property.name.toLowerCase().includes(query) ||
  property.location.toLowerCase().includes(query) ||
  property.type.toLowerCase().includes(query) ||
  property.college.toLowerCase().includes(query);

    const matchesStayType =
      selectedStayType === "" ||
      property.type === selectedStayType;

      const matchesCollege =
  selectedCollege === null ||
  property.college === selectedCollege.name;

const matchesDistance =
  activeDistanceFilter === "All distances"
   ||
  (activeDistanceFilter === "Within 1 km"
    ? property.distanceFromCollege <= 1
    : activeDistanceFilter === "Within 3 km"
      ? property.distanceFromCollege <= 3
      : property.distanceFromCollege <= 5);

const matchesExploreFilter =
      activeFilter === "All stays" ||
      (activeFilter === "Under ₹8k"
        ? property.rooms.some((room) => room.price <= 8000)
        : property.type === activeFilter);

   return (
  matchesSearch &&
  matchesStayType &&
  matchesCollege &&
  matchesDistance &&
  matchesExploreFilter
);
  });

  const getMinimumPrice = (property) => {
  const prices = property.rooms
    .map((room) => room.price)
    .filter((price) => Number.isFinite(price));

  return prices.length > 0 ? Math.min(...prices) : Infinity;
};

const sortedProperties = [...filteredProperties].sort(
  (a, b) => {
    for (const option of sortOptions) {
      if (option === "nearest") {
        const distanceDifference =
          a.distanceFromCollege - b.distanceFromCollege;

        if (distanceDifference !== 0) {
          return distanceDifference;
        }
      }

      if (option === "lowestPrice") {
        const priceDifference =
          getMinimumPrice(a) - getMinimumPrice(b);

        if (priceDifference !== 0) {
          return priceDifference;
        }
      }

      if (option === "highestRated") {
        const ratingDifference =
          b.rating - a.rating;

        if (ratingDifference !== 0) {
          return ratingDifference;
        }
      }
    }

    return 0;
  }
);

  const handleCollegeSelect = (college) => {
  setSelectedCollege(college);

  setSearchQuery(college.name);

  setActiveSearch(college.name);

  setShowCollegeSuggestions(false);

  setActiveFilter("All stays");
  setActiveDistanceFilter("All distances");

  fetchPropertiesByCollege(college.id);

  setTimeout(() => {
    document
      .getElementById("explore")
      ?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
  }, 50);
};

  const handleSearch = async (event) => {
  event.preventDefault();

  const query = searchQuery.trim();

  if (!query) {
    return;
  }

  try {
    setActiveSearch(query);
    setActiveFilter("All stays");
    setActiveDistanceFilter("All distances");

    setLoadingProperties(true);
    setPropertiesError("");

    const response = await fetch(
      `http://localhost:5000/api/properties?search=${encodeURIComponent(
        query
      )}`
    );

    if (!response.ok) {
      throw new Error("Failed to search properties");
    }

    const data = await response.json();

    if (!data.success) {
      throw new Error("Backend returned an error");
    }

    const normalizedProperties = data.properties.map(
      normalizePropertyFromApi
    );

    setProperties(normalizedProperties);

    setTimeout(() => {
      document
        .getElementById("explore")
        ?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
    }, 50);
  } catch (error) {
    console.error(
      "Failed to search properties:",
      error
    );

    setPropertiesError(
      "Unable to search properties right now."
    );
  } finally {
    setLoadingProperties(false);
  }
};

useEffect(() => {
  if (isLoggedIn) {
    fetchMyProperties();
  } else {
    setMyProperties([]);
  }
}, [isLoggedIn]);

 const handleLogin = () => {
  setAuthMode("login");
  setAuthError("");
  setAuthMessage("");
  setShowAuthModal(true);
};

const handleSignup = () => {
  setAuthMode("signup");
  setAuthError("");
  setAuthMessage("");
  setShowAuthModal(true);
};

const handleAuthSubmit = async (event) => {
  event.preventDefault();

  setAuthError("");
  setAuthMessage("");
  setAuthLoading(true);

  const formData = new FormData(event.currentTarget);

  const name = formData.get("name")?.trim();
  const email = formData.get("email")?.trim();
  const password = formData.get("password");
  const phone = formData.get("phone")?.trim();

  try {
    const isSignup = authMode === "signup";

    const requestBody = isSignup
      ? {
          name,
          email,
          password,
          phone,
        }
      : {
          email,
          password,
        };

    const response = await fetch(
      `http://localhost:5000/api/auth/${
        isSignup ? "signup" : "login"
      }`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      }
    );

    const data = await response.json();

    if (!response.ok || !data.success) {
      throw new Error(
        data.message ||
          (isSignup
            ? "Unable to create account"
            : "Unable to login")
      );
    }

    localStorage.setItem(
      "findYourHostelToken",
      data.token
    );

    localStorage.setItem(
      "findYourHostelUser",
      JSON.stringify(data.user)
    );

    setCurrentUser(data.user);
    setIsLoggedIn(true);

    setAuthMessage(
      isSignup
        ? "Account created successfully!"
        : "Login successful!"
    );

    setTimeout(() => {
      setShowAuthModal(false);
      setAuthError("");
      setAuthMessage("");
    }, 900);
  } catch (error) {
    console.error("Authentication failed:", error);

    setAuthError(
      error.message ||
        "Something went wrong. Please try again."
    );
  } finally {
    setAuthLoading(false);
  }
};

const handleDeleteProperty = async (property) => {
  const token = localStorage.getItem("findYourHostelToken");

  if (!token) {
    handleLogin();
    return;
  }

  setPropertyToDelete(property);
  setDeleteError("");
};

const fetchMyProperties = async () => {
  const token = localStorage.getItem("findYourHostelToken");

  if (!token) {
    setMyProperties([]);
    return;
  }

  setMyPropertiesLoading(true);

  try {
    const response = await fetch(
      "http://localhost:5000/api/my-properties",
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const data = await response.json();

    if (!response.ok || !data.success) {
      throw new Error(
        data.message || "Failed to fetch your properties"
      );
    }

    setMyProperties(data.properties || []);
  } catch (error) {
    console.error(
      "Failed to fetch my properties:",
      error
    );

    setMyProperties([]);
  } finally {
    setMyPropertiesLoading(false);
  }
};

const handleLogout = () => {
  localStorage.removeItem("findYourHostelToken");
  localStorage.removeItem("findYourHostelUser");

  setCurrentUser(null);
  setIsLoggedIn(false);
};
// =========================================================
// =========================================================



const handleViewDetails = (property) => {
  setSelectedProperty(property);
  setSelectedGalleryImage(0);
  setShowPropertyDetails(true);
};

const handleViewMap = (property) => {
  setSelectedProperty(property);
  setShowPropertyMap(true);
};

 const handleFilter = async (filter) => {
  try {
    setActiveFilter(filter);
    setLoadingProperties(true);
    setPropertiesError("");

    const params = new URLSearchParams();

    // Selected college preserve karo
    if (selectedCollege) {
      params.append("collegeId", selectedCollege.id);
    }

    // Active search preserve karo
    if (activeSearch.trim()) {
      params.append("search", activeSearch.trim());
    }

    // Stay type / budget filter
    if (
      filter === "PG" ||
      filter === "Hostel" ||
      filter === "Co-living"
    ) {
      const typeMap = {
        PG: "PG",
        Hostel: "HOSTEL",
        "Co-living": "CO_LIVING",
      };
      const verificationStatus =
  apiProperty.verification_status || "PENDING";

const isVerified =
  verificationStatus === "VERIFIED";

      params.append("type", typeMap[filter]);
    }

    if (filter === "Under ₹8k") {
      params.append("maxPrice", "8000");
    }

    // Existing distance filter preserve karo
    const distanceMap = {
      "Within 1 km": 1,
      "Within 3 km": 3,
      "Within 5 km": 5,
    };

    if (distanceMap[activeDistanceFilter]) {
      params.append(
        "maxDistance",
        distanceMap[activeDistanceFilter]
      );
    }

    const queryString = params.toString();

    const response = await fetch(
      `http://localhost:5000/api/properties${
        queryString ? `?${queryString}` : ""
      }`
    );

    if (!response.ok) {
      throw new Error("Failed to fetch filtered properties");
    }

    const data = await response.json();

    if (!data.success) {
      throw new Error("Backend returned an error");
    }

    const normalizedProperties = data.properties.map(
      normalizePropertyFromApi
    );

    setProperties(normalizedProperties);
  } catch (error) {
    console.error(
      "Failed to load filtered properties:",
      error
    );

    setPropertiesError(
      "Unable to load filtered properties."
    );
  } finally {
    setLoadingProperties(false);
  }
};
const handleDistanceFilter = async (filter) => {
  try {
    setActiveDistanceFilter(filter);
    setLoadingProperties(true);
    setPropertiesError("");

    const params = new URLSearchParams();

    // Selected college preserve karo
    if (selectedCollege) {
      params.append("collegeId", selectedCollege.id);
    }

    // Active search preserve karo
    if (activeSearch.trim()) {
      params.append("search", activeSearch.trim());
    }

    // Existing stay-type / budget filter preserve karo
    if (
      activeFilter === "PG" ||
      activeFilter === "Hostel" ||
      activeFilter === "Co-living"
    ) {
      const typeMap = {
        PG: "PG",
        Hostel: "HOSTEL",
        "Co-living": "CO_LIVING",
      };

      params.append("type", typeMap[activeFilter]);
    }

    if (activeFilter === "Under ₹8k") {
      params.append("maxPrice", "8000");
    }

    // New distance filter
    const distanceMap = {
      "Within 1 km": 1,
      "Within 3 km": 3,
      "Within 5 km": 5,
    };

    if (distanceMap[filter]) {
      params.append(
        "maxDistance",
        distanceMap[filter]
      );
    }

    const queryString = params.toString();

    const response = await fetch(
      `http://localhost:5000/api/properties${
        queryString ? `?${queryString}` : ""
      }`
    );

    if (!response.ok) {
      throw new Error(
        "Failed to fetch distance-filtered properties"
      );
    }

    const data = await response.json();

    if (!data.success) {
      throw new Error("Backend returned an error");
    }

    const normalizedProperties = data.properties.map(
      normalizePropertyFromApi
    );

    setProperties(normalizedProperties);
  } catch (error) {
    console.error(
      "Failed to load distance-filtered properties:",
      error
    );

    setPropertiesError(
      "Unable to load filtered properties."
    );
  } finally {
    setLoadingProperties(false);
  }
};

const handleViewAll = () => {
  setActiveFilter("All stays");
};

const toggleSortOption = (option) => {
  setSortOptions((currentOptions) => {
    if (currentOptions.includes(option)) {
      return currentOptions.filter(
        (currentOption) => currentOption !== option
      );
    }

    return [...currentOptions, option];
  });
};

const toggleSavedProperty = (property) => {
  if (!isLoggedIn) {
    handleLogin();
    return;
  }

  setSavedProperties((currentSavedProperties) => {
    const isAlreadySaved = currentSavedProperties.some(
      (savedProperty) => savedProperty.id === property.id
    );

    if (isAlreadySaved) {
      return currentSavedProperties.filter(
        (savedProperty) => savedProperty.id !== property.id
      );
    }

    return [...currentSavedProperties, property];
  });
};
const toggleCompareProperty = (property) => {
  setCompareProperties((currentProperties) => {
    const isAlreadyAdded = currentProperties.some(
      (compareProperty) => compareProperty.id === property.id
    );

    if (isAlreadyAdded) {
      return currentProperties.filter(
        (compareProperty) => compareProperty.id !== property.id
      );
    }

    if (currentProperties.length >= 3) {
      return currentProperties;
    }

    return [...currentProperties, property];
  });
};

  return (
    <main className="app-shell">
      {showAddProperty && (
  <div className="add-property-overlay">
    <div className="add-property-overlay-inner">
      <button
        type="button"
        className="add-property-back"
        onClick={() => setShowAddProperty(false)}
      >
        ← Back to Explore
      </button>

     <AddProperty
  propertyToEdit={propertyToEdit}
  onClose={() => {
    setShowAddProperty(false);
    setPropertyToEdit(null);

    setPropertiesRefreshKey(
      (currentKey) => currentKey + 1
    );

    if (isLoggedIn) {
      fetchMyProperties();
    }
  }}
/>
    </div>
  </div>
)}
      {/* NAVIGATION */}
      <nav className="navbar">
  <a className="brand" href="/">
    <span className="brand-mark">⌂</span>
    FindYourHostel
  </a>

  <div className="nav-links">
  <a href="#explore">Explore</a>

  <a href="#how-it-works">How it works</a>

  <button
  className="saved-stays-button"
  type="button"
  onClick={() => {
    if (!isLoggedIn) {
      handleLogin();
      return;
    }

    setShowSavedStays(true);
  }}
>
    <span className="saved-stays-icon">
      {savedProperties.length > 0 ? "♥" : "♡"}
    </span>

    <span>Saved stays</span>

    {savedProperties.length > 0 && (
      <span className="saved-stays-count">
        {savedProperties.length}
      </span>
    )}
  </button>
 <div className="owner-nav-actions">


 <button
  type="button"
  className="owner-list-property-button"
  onClick={() => {
    if (!isLoggedIn) {
      handleLogin();
      return;
    }

    setShowAddProperty(true);
  }}
>
    <span className="owner-list-property-icon">＋</span>
    <span>List Your Property</span>
  </button>

</div>

  {isLoggedIn ? (
  <div className="logged-in-user">
    <button
      type="button"
      className="user-account-button"
      onClick={() => setShowOwnerDashboard(true)}
    >
      <span className="user-account-name">
  {currentUser?.name || "Account"}
</span>

    </button>

    <button
      type="button"
      className="logout-button"
      onClick={handleLogout}
    >
      Log out
    </button>
  </div>
) : (
  <button
    className="login-button"
    type="button"
    onClick={handleLogin}
  >
    Log in
  </button>
)}
</div>
</nav>
{showOwnerDashboard && (
  <div
    className="owner-dashboard-overlay"
    onClick={() => {
      setShowOwnerDashboard(false);
      setShowMyProperties(false);
    }}
  >
    <div
      className="owner-dashboard-panel"
      onClick={(event) => event.stopPropagation()}
    >
      {!showMyProperties ? (
        <>
          {/* =====================================================
              OWNER DASHBOARD HOME
              ===================================================== */}

          <div className="owner-dashboard-header">
            <div>
              <span className="owner-dashboard-eyebrow">
                OWNER SPACE
              </span>

              <h2>Owner Dashboard</h2>

              <p>
                Manage your properties and keep your listings up to
                date.
              </p>
            </div>

            <button
              type="button"
              className="owner-dashboard-close"
              onClick={() => {
                setShowOwnerDashboard(false);
                setShowMyProperties(false);
              }}
              aria-label="Close owner dashboard"
            >
              ×
            </button>
          </div>

          <div className="owner-dashboard-stats">
            {/* My Properties */}
            <button
              type="button"
              className="owner-dashboard-stat-card owner-dashboard-stat-card-clickable"
              onClick={() => {
                setShowMyProperties(true);
              }}
            >
              <div className="owner-dashboard-stat-icon">
                🏠
              </div>

              <div>
                <strong>My Properties</strong>
                <span>Manage your listings</span>
              </div>
            </button>

            {/* Verified Listings */}
            <div className="owner-dashboard-stat-card">
              <span className="owner-dashboard-stat-icon">
                ✓
              </span>

              <div>
                <strong>Verified Listings</strong>
                <span>Build student trust</span>
              </div>
            </div>

            {/* Enquiries */}
            <div className="owner-dashboard-stat-card">
              <span className="owner-dashboard-stat-icon">
                📩
              </span>

              <div>
                <strong>Enquiries</strong>
                <span>Coming soon</span>
              </div>
            </div>
          </div>
        </>
      ) : (
        <>
          {/* =====================================================
              MY PROPERTIES
              ===================================================== */}

          <div className="owner-my-properties-header">
  <button
    type="button"
    className="owner-my-properties-back"
    onClick={() => {
      setShowMyProperties(false);
    }}
  >
    ← Back to Dashboard
  </button>

  <div className="owner-my-properties-title">
    <h2>My Properties</h2>

    <p>
      Manage your properties and keep your listings up to date.
    </p>
  </div>
</div>

          <div className="owner-dashboard-section">
            <div className="owner-dashboard-section-heading">
  <div></div>

  <button
    type="button"
    className="owner-dashboard-add-button"
    onClick={() => {
      setShowOwnerDashboard(false);
      setShowMyProperties(false);
      setShowAddProperty(true);
    }}
  >
    ＋ Add Property
  </button>
</div>
                

            <div className="owner-property-list">
              {myPropertiesLoading && (
                <div className="owner-dashboard-empty">
                  <div className="owner-dashboard-empty-icon">
                    ⏳
                  </div>

                  <h4>Loading your properties...</h4>

                  <p>
                    Please wait while we fetch your listings.
                  </p>
                </div>
              )}

              {!myPropertiesLoading &&
                myProperties.map((property) => (
                  <div
                    className="owner-property-card"
                    key={property.id}
                  >
                    <div
                      className="owner-property-image"
                      style={{
                        backgroundImage: `url(${property.image})`,
                      }}
                    />

                    <div className="owner-property-content">
                      <div className="owner-property-top">
                        <div>
                          <span className="owner-property-type">
                            {property.type}
                          </span>

                          <h4>{property.name}</h4>

                          <p>{property.location}</p>
                        </div>

                        <span
                          className={`owner-property-status ${
                            property.verificationStatus ===
                            "VERIFIED"
                              ? "verified"
                              : "pending"
                          }`}
                        >
                          {property.verificationStatus ===
                          "VERIFIED"
                            ? "✓ Verified"
                            : "◷ Pending"}
                        </span>
                      </div>

                      <div className="owner-property-actions">
                        <button
                          type="button"
                          className="owner-property-view-button"
                          onClick={() => {
                            setShowOwnerDashboard(false);
                            setShowMyProperties(false);
                            handleViewDetails(property);
                          }}
                        >
                          View Details
                        </button>

                        <button
                          type="button"
                          className="owner-property-edit-button"
                          onClick={() => {
                            setPropertyToEdit(property);
                            setShowOwnerDashboard(false);
                            setShowMyProperties(false);
                            setShowAddProperty(true);
                          }}
                        >
                          ✎ Edit Property
                        </button>

                        <button
                          type="button"
                          className="owner-property-delete-button"
                          onClick={() =>
                            handleDeleteProperty(property)
                          }
                        >
                          Delete Property
                        </button>
                      </div>
                    </div>
                  </div>
                ))}

              {!myPropertiesLoading &&
                myProperties.length === 0 && (
                  <div className="owner-dashboard-empty">
                    <div className="owner-dashboard-empty-icon">
                      🏠
                    </div>

                    <h4>No properties yet</h4>

                    <p>
                      Add your first PG or hostel listing to
                      start receiving student enquiries.
                    </p>

                    <button
                      type="button"
                      onClick={() => {
                        setShowOwnerDashboard(false);
                        setShowMyProperties(false);
                        setShowAddProperty(true);
                      }}
                    >
                      ＋ List Your Property
                    </button>
                  </div>
                )}
            </div>
          </div>
        </>
      )}
    </div>
  </div>
)}
{propertyToDelete && (
  <div className="delete-property-overlay">
    <div className="delete-property-modal">
      <div className="delete-property-icon">
        !
      </div>

      <div className="delete-property-content">
        <h3>Delete Property?</h3>

        <p>
          Are you sure you want to delete{" "}
          <strong>{propertyToDelete.name}</strong>?
        </p>

        <span className="delete-property-warning">
          This action cannot be undone.
        </span>

        {deleteError && (
          <div className="delete-property-error">
            {deleteError}
          </div>
        )}
      </div>

      <div className="delete-property-actions">
        <button
          type="button"
          className="delete-property-cancel-button"
          onClick={() => {
            if (deleteLoading) return;

            setPropertyToDelete(null);
            setDeleteError("");
          }}
          disabled={deleteLoading}
        >
          Cancel
        </button>

        <button
          type="button"
          className="delete-property-confirm-button"
          disabled={deleteLoading}
          onClick={async () => {
            const token = localStorage.getItem(
              "findYourHostelToken"
            );

            if (!token) {
              setPropertyToDelete(null);
              setDeleteError("");
              handleLogin();
              return;
            }

            setDeleteLoading(true);
            setDeleteError("");

            try {
              const response = await fetch(
                `http://localhost:5000/api/properties/${propertyToDelete.id}`,
                {
                  method: "DELETE",
                  headers: {
                    Authorization: `Bearer ${token}`,
                  },
                }
              );

              const data = await response.json();

              if (!response.ok || !data.success) {
                throw new Error(
                  data.message ||
                    "Failed to delete property"
                );
              }

              setMyProperties((currentProperties) =>
                currentProperties.filter(
                  (item) =>
                    item.id !== propertyToDelete.id
                )
              );

              setPropertyToDelete(null);
              setDeleteError("");
            } catch (error) {
              console.error(
                "Failed to delete property:",
                error
              );

              setDeleteError(
                error.message ||
                  "Unable to delete property right now."
              );
            } finally {
              setDeleteLoading(false);
            }
          }}
        >
          {deleteLoading ? (
            <>
              <span className="delete-button-spinner"></span>
              Deleting...
            </>
          ) : (
            "Delete Property"
          )}
        </button>
      </div>
    </div>
  </div>
)}
{showSavedStays && (
  <div
    className="saved-stays-overlay"
    onClick={() => setShowSavedStays(false)}
  >
    <div
      className="saved-stays-panel"
      onClick={(event) => event.stopPropagation()}
    >
      <button
        type="button"
        className="saved-stays-panel-close"
        onClick={() => setShowSavedStays(false)}
        aria-label="Close saved stays"
      >
        ×
      </button>

      <div className="saved-stays-list">
        {savedProperties.map((property) => (
          <div
            className="saved-stay-card"
            key={property.id}
          >
            <div
              className="saved-stay-card-image"
              style={{
                backgroundImage: `url(${property.image})`,
              }}
            />

            <div className="saved-stay-card-content">
              <div className="saved-stay-card-top">
                <div>
                  <h3>{property.name}</h3>

                  <p>
                    <span>⌖</span>
                    {property.location}
                  </p>
                </div>

                <button
                  type="button"
                  className="saved-stay-remove"
                  onClick={() => toggleSavedProperty(property)}
                  aria-label={`Remove ${property.name} from saved stays`}
                >
                  ♥
                </button>
              </div>

              <div className="saved-stay-card-meta">
                <span>★ {property.rating}</span>

                <span>
                  {property.distanceFromCollege} km
                </span>

                <span>{property.type}</span>
              </div>

              <button
                type="button"
                className="saved-stay-view-button"
                onClick={() => {
                  setShowSavedStays(false);
                  handleViewDetails(property);
                }}
              >
                View details →
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
)}

{compareProperties.length > 0 && (
  <div className="compare-floating-bar">
    <div className="compare-floating-content">
      <div className="compare-floating-info">
        <div className="compare-floating-icon">
          ⇄
        </div>

        <div>
          <strong>
            {compareProperties.length}{" "}
            {compareProperties.length === 1
              ? "stay"
              : "stays"}{" "}
            selected
          </strong>

          <span>
            {compareProperties
              .map((property) => property.name)
              .join(" • ")}
          </span>
        </div>
      </div>

      <div className="compare-floating-actions">
        <button
          type="button"
          className="compare-floating-clear"
          onClick={() => setCompareProperties([])}
        >
          Clear
        </button>

        <button
          type="button"
          className="compare-floating-button"
          onClick={() => {
  if (compareProperties.length >= 2) {
    setShowComparePanel(true);
  }
}}
        >
        Compare options
<span>→</span>
        </button>
      </div>
    </div>
  </div>
)}

      {/* HERO SECTION */}
      <section className="hero">
        <div className="hero-copy">
          <p className="eyebrow">STUDENT LIVING, MADE SIMPLE</p>

          <h1>
            Find a place
            <span>that feels like home.</span>
          </h1>

          <p className="hero-description">
            Discover verified hostels and PGs near your college, compare
            facilities, and find your perfect stay with confidence.
          </p>

          <form className="search-panel" onSubmit={handleSearch}>
            <div className="search-field college-search-field">
  <span>⌖</span>

  <div className="college-search-wrapper">
    <label htmlFor="location">College or location</label>

    <input
      id="location"
      type="text"
      placeholder="Search your college"
      value={searchQuery}
      onFocus={() => {
        if (searchQuery.trim()) {
          setShowCollegeSuggestions(true);
        }
      }}
      onChange={(event) => {
        setSearchQuery(event.target.value);
        setSelectedCollege(null);
        setShowCollegeSuggestions(true);
      }}
    />

    {showCollegeSuggestions &&
      collegeSuggestions.length > 0 && (
        <div className="college-suggestions">
          {collegeSuggestions.map((college) => (
            <button
              key={college.id}
              type="button"
              className="college-suggestion"
              onMouseDown={(event) => {
                event.preventDefault();
                handleCollegeSelect(college);
              }}
            >
              <span className="college-suggestion-icon">
                🎓
              </span>

              <span className="college-suggestion-content">
                <strong>{college.name}</strong>

                <small>{college.city}</small>
              </span>

              <span className="college-suggestion-arrow">
                →
              </span>
            </button>
          ))}
        </div>
      )}
  </div>
</div>

            <div className="search-divider" />

            <div className="search-field">
              <span>⌂</span>

              <div>
                <label htmlFor="stay-type">Stay type</label>

                <select
  id="stay-type"
  value={selectedStayType}
  onChange={(event) =>
    setSelectedStayType(event.target.value)
  }
>
                  <option value="" >
                    PG, hostel, co-living
                  </option>

                  <option value="PG">PG</option>

                  <option value="Hostel">Hostel</option>

                  <option value="Co-living">Co-living</option>
                </select>
              </div>
            </div>

            <button className="search-button" type="submit">
              Search stays
              <span>→</span>
            </button>
          </form>

          <div className="trust-row">
            <span>✓ Verified listings</span>

            <span>✓ No hidden charges</span>

            <span>✓ Student-friendly</span>
          </div>
        </div>

        {/* HERO FEATURED PROPERTY */}
        <div
          className="hero-visual"
          aria-label="Featured hostel preview"
        >
          <div className="glow glow-one" />

          <div className="glow glow-two" />

       {featuredProperty && (
  <PropertyCard
    property={featuredProperty}
    onViewDetails={handleViewDetails}
    onViewMap={handleViewMap}
    isSaved={savedProperties.some(
      (savedProperty) => savedProperty.id === featuredProperty.id
    )}
    onToggleSave={toggleSavedProperty}
    isCompared={compareProperties.some(
      (compareProperty) => compareProperty.id === featuredProperty.id
    )}
    onToggleCompare={toggleCompareProperty}
  />
)}



          <div className="floating-card">
            <span className="floating-icon">✦</span>

            <div>
              <strong>2,500+</strong>

              <small>verified stays</small>
            </div>
          </div>
        </div>
      </section>

      {/* EXPLORE SECTION */}
      <section className="explore-section" id="explore">
        <div className="section-heading-row">
  <div className="section-heading">
    <p className="section-eyebrow">
      {selectedCollege
        ? "NEARBY STUDENT STAYS"
        : "DISCOVER YOUR NEXT STAY"}
    </p>

    <h2>
      {selectedCollege ? (
        <>
          Stays near
          <span>{selectedCollege.name}.</span>
        </>
      ) : (
        <>
          Places students
          <span>love to live.</span>
        </>
      )}
    </h2>

    <p>
      {selectedCollege
        ? "Explore PGs, hostels and co-living spaces near " +
          selectedCollege.name +
          "."
        : "Explore handpicked PGs, hostels and co-living spaces around popular student neighbourhoods."}
    </p>
  </div>

  <button
    className="view-all-button"
    type="button"
    onClick={handleViewAll}
  >
    View all stays
    <span>→</span>
  </button>
</div>

        {/* FILTERS */}
        <div className="filter-row">
  {exploreFilters.map((filter) => (
    <button
      key={filter}
      className={`filter-chip ${
        activeFilter === filter ? "active" : ""
      }`}
      type="button"
      onClick={() => handleFilter(filter)}
    >
      {filter}
    </button>
  ))}
</div>

{selectedCollege && (
  <div className="distance-filter-row">
    <div className="distance-filter-label">
      <span>⌖</span>
      Distance from {selectedCollege.name}
    </div>

    <div className="distance-filter-options">
      {distanceFilters.map((filter) => (
        <button
          key={filter}
          className={`distance-chip ${
            activeDistanceFilter === filter ? "active" : ""
          }`}
          type="button"
          onClick={() => handleDistanceFilter(filter)}
        >
          {filter}
        </button>
      ))}
    </div>
  </div>
)}

<div className="results-meta">
  <div className="results-count">
    <span className="results-count-number">
      {filteredProperties.length}
    </span>

    <span>
      {filteredProperties.length === 1 ? "stay" : "stays"} found
    </span>
  </div>

  <div className="results-meta-right">
    
    <div className="priority-control">
      <span className="priority-label">
        Prioritize by
      </span>

      <div className="priority-options">
        <button
          type="button"
          className={`priority-chip ${
            sortOptions.includes("nearest") ? "active" : ""
          }`}
          onClick={() => toggleSortOption("nearest")}
        >
          <span className="priority-check">
            {sortOptions.includes("nearest") ? "✓" : ""}
          </span>

          Nearest
        </button>

        <button
          type="button"
          className={`priority-chip ${
            sortOptions.includes("lowestPrice") ? "active" : ""
          }`}
          onClick={() => toggleSortOption("lowestPrice")}
        >
          <span className="priority-check">
            {sortOptions.includes("lowestPrice") ? "✓" : ""}
          </span>

          Lowest price
        </button>

        <button
          type="button"
          className={`priority-chip ${
            sortOptions.includes("highestRating") ? "active" : ""
          }`}
          onClick={() => toggleSortOption("highestRating")}
        >
          <span className="priority-check">
            {sortOptions.includes("highestRating") ? "✓" : ""}
          </span>

          Highest rated
        </button>
      </div>
    </div>
  </div>
</div>
      
    

<div className="property-grid">
  {filteredProperties.length > 0 ? (
    sortedProperties.map((property) => (
      <PropertyCard
        key={property.id}
        property={property}
        onViewDetails={handleViewDetails}
        onViewMap={handleViewMap}
        
        isSaved={savedProperties.some(
          (savedProperty) => savedProperty.id === property.id
        )}
        onToggleSave={toggleSavedProperty}
        isCompared={compareProperties.some(
          (compareProperty) => compareProperty.id === property.id
        )}
        onToggleCompare={toggleCompareProperty}
      />
    ))
  ) : (
    <div className="empty-state">
  <div className="empty-state-visual">
    <div className="empty-state-glow" />

    <div className="empty-state-home">
      <span className="empty-state-roof" />
      <span className="empty-state-door" />
    </div>

    <div className="empty-state-search">
      <span />
    </div>

    <span className="empty-state-spark spark-one">+</span>
    <span className="empty-state-spark spark-two">✦</span>
    <span className="empty-state-dot dot-one" />
    <span className="empty-state-dot dot-two" />
  </div>

  <div className="empty-state-content">
    <span className="empty-state-eyebrow">
      No matching stays
    </span>

    <h3>No stays found</h3>

    <p>
      We couldn't find any stays matching your current
      filters. Try adjusting your budget, property type,
      gender or distance preferences.
    </p>
  </div>
</div>
  )}
</div>     </section>

      {/* HOW IT WORKS */}
      <section
        className="how-it-works-section"
        id="how-it-works"
      >
        <div className="section-heading centered-heading">
          <p className="section-eyebrow">HOW IT WORKS</p>

          <h2>
            Finding your stay
            <span>shouldn't be hard.</span>
          </h2>

          <p>
            Everything you need to find the right place,
            without endless calls and confusing listings.
          </p>
        </div>

        <div className="steps-grid">
  <article
    className="step-card step-card-clickable"
    role="button"
    tabIndex={0}
    onClick={() => {
      const collegeInput = document.getElementById("location");

      if (collegeInput) {
        collegeInput.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });

        setTimeout(() => {
          collegeInput.focus();
        }, 500);
      }
    }}
    onKeyDown={(event) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();

        const collegeInput = document.getElementById("location");

        if (collegeInput) {
          collegeInput.scrollIntoView({
            behavior: "smooth",
            block: "center",
          });

          setTimeout(() => {
            collegeInput.focus();
          }, 500);
        }
      }
    }}
  >
    <div className="step-number">01</div>

    <div className="step-icon">⌖</div>

    <h3>Choose your college</h3>

    <p>
      Search your college or preferred neighbourhood
      and instantly explore nearby stays.
    </p>
  </article>

  <article
    className="step-card step-card-clickable"
    role="button"
    tabIndex={0}
    onClick={() => {
      const exploreSection = document.getElementById("explore");

      if (exploreSection) {
        exploreSection.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    }}
    onKeyDown={(event) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();

        const exploreSection = document.getElementById("explore");

        if (exploreSection) {
          exploreSection.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
        }
      }
    }}
  >
    <div className="step-number">02</div>

    <div className="step-icon">⌕</div>

    <h3>Compare your options</h3>

    <p>
      Compare rent, amenities, ratings, distance,
      food and everything that matters to you.
    </p>
  </article>

  <article
    className="step-card step-card-clickable"
    role="button"
    tabIndex={0}
    onClick={() => {
      const exploreSection = document.getElementById("explore");

      if (exploreSection) {
        exploreSection.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    }}
    onKeyDown={(event) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();

        const exploreSection = document.getElementById("explore");

        if (exploreSection) {
          exploreSection.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
        }
      }
    }}
  >
    <div className="step-number">03</div>

    <div className="step-icon">✓</div>

    <h3>Find your perfect stay</h3>

    <p>
      Shortlist your favourites and connect directly
      with the property owner.
    </p>
  </article>
</div>
</section>
    {showPropertyDetails && selectedProperty && (
  <div className="property-modal-overlay">
    <div className="property-modal">
      <button
        type="button"
        className="property-modal-close"
        onClick={() => setShowPropertyDetails(false)}
        aria-label="Close property details"
      >
        ×
      </button>

      <div className="property-modal-gallery">
  <div
    className="property-modal-image"
    style={{
      backgroundImage: `url(${
        selectedProperty.gallery?.[selectedGalleryImage] ||
        selectedProperty.image
      })`,
    }}
  >
    {selectedProperty.gallery?.length > 1 && (
      <>
        <button
          type="button"
          className="gallery-arrow gallery-arrow-left"
          onClick={() =>
            setSelectedGalleryImage((currentIndex) =>
              Math.max(currentIndex - 1, 0)
            )
          }
          disabled={selectedGalleryImage === 0}
          aria-label="Previous photo"
        >
          ←
        </button>

        <button
          type="button"
          className="gallery-arrow gallery-arrow-right"
          onClick={() =>
            setSelectedGalleryImage((currentIndex) =>
              Math.min(
                currentIndex + 1,
                selectedProperty.gallery.length - 1
              )
            )
          }
          disabled={
            selectedGalleryImage ===
            selectedProperty.gallery.length - 1
          }
          aria-label="Next photo"
        >
          →
        </button>

        

        <div className="gallery-counter">
          {selectedGalleryImage + 1} /{" "}
          {selectedProperty.gallery.length}
        </div>
      </>
    )}
  </div>

  {selectedProperty.gallery?.length > 1 && (
    <div className="property-modal-thumbnails">
      {selectedProperty.gallery.map((image, index) => (
        <button
          key={image}
          type="button"
          className={`property-modal-thumbnail ${
            selectedGalleryImage === index ? "active" : ""
          }`}
          onClick={() => setSelectedGalleryImage(index)}
          aria-label={`View property photo ${index + 1}`}
        >
          <img
            src={image}
            alt={`${selectedProperty.name} photo ${index + 1}`}
          />
        </button>
      ))}
    </div>
  )}
</div>

      <div className="property-modal-content">
        <div className="property-modal-top">
          <div>
            <span className="property-modal-tag">
              {selectedProperty.tag}
            </span>

            <h2>{selectedProperty.name}</h2>

            <p className="property-modal-location">
              ⌖ {selectedProperty.location}
            </p>
          </div>

          <div className="property-modal-rating">
            <span>★</span>
            <strong>{selectedProperty.rating}</strong>
            <small>
              {selectedProperty.reviews} reviews
            </small>
          </div>
        </div>

        <div className="property-modal-info">
          <div>
            <span>Type</span>
            <strong>{selectedProperty.type}</strong>
          </div>

          <div>
            <span>Distance</span>
            <strong>
              {selectedProperty.distanceFromCollege} km
            </strong>
          </div>

          <div>
            <span>Availability</span>
            <strong>{selectedProperty.availability}</strong>
          </div>
        </div>

        <div className="property-modal-amenities">
  <div className="property-modal-section-heading">
    <span>AMENITIES</span>
    <small>Everything you need for a comfortable stay</small>
  </div>

  <div className="property-modal-amenity-grid">
    {selectedProperty.amenities?.map((amenity) => (
      <div
        className="property-modal-amenity"
        key={amenity}
      >
        <span className="property-modal-amenity-check">
          ✓
        </span>

        <span>{amenity}</span>
      </div>
    ))}
  </div>
</div>

<div className="property-modal-stay-info">
  <div className="property-modal-section-heading">
    <span>STAY INFORMATION</span>
    <small>Everything you should know before moving in</small>
  </div>

  <div className="property-modal-info-grid">
    <div className="property-modal-info-card">
      <span className="property-modal-info-icon">🍽️</span>
      <div>
        <span className="property-modal-info-label">Food & meals</span>
        <strong>
          {selectedProperty.details?.food || "Information unavailable"}
        </strong>
      </div>
    </div>

    <div className="property-modal-info-card">
      <span className="property-modal-info-icon">🛡️</span>
      <div>
        <span className="property-modal-info-label">Security</span>
        <strong>
          {selectedProperty.details?.security || "Information unavailable"}
        </strong>
      </div>
    </div>

    <div className="property-modal-info-card">
      <span className="property-modal-info-icon">💰</span>
      <div>
        <span className="property-modal-info-label">Security deposit</span>
        <strong>
          {selectedProperty.details?.deposit || "Information unavailable"}
        </strong>
      </div>
    </div>

    <div className="property-modal-info-card">
      <span className="property-modal-info-icon">📋</span>
      <div>
        <span className="property-modal-info-label">House rules</span>
        <strong>
          {selectedProperty.details?.rules || "Information unavailable"}
        </strong>
      </div>
    </div>
  </div>
</div>

<div className="property-modal-rooms">
  <div className="property-modal-section-heading">
    <span>ROOM OPTIONS</span>
    <small>Choose what works best for you</small>
  </div>

  <div className="property-modal-room-grid">
    {selectedProperty.rooms?.map((room) => (
      <div
        className="property-modal-room-card"
        key={room.id}
      >
        <div className="property-modal-room-top">
          <div>
            <span className="property-modal-room-label">
              ROOM TYPE
            </span>
            <strong>{room.type}</strong>
          </div>

          <span className="property-modal-room-chip">
            {room.shortLabel}
          </span>
        </div>

        <div className="property-modal-room-bottom">
          <div className="property-modal-room-price">
            <strong>
              ₹{room.price.toLocaleString("en-IN")}
            </strong>
            <span>/ month</span>
          </div>

          <span className="property-modal-room-availability">
            Available
          </span>
        </div>
      </div>
    ))}
  </div>
</div>

        <div className="property-modal-actions">
  <button
    type="button"
    className="property-modal-secondary"
    onClick={() => setShowPropertyDetails(false)}
  >
    Close
  </button>

  {!showOwnerContact && (
    <button
      type="button"
      className="property-modal-primary-button owner-contact-trigger"
     onClick={() => {
  if (!isLoggedIn) {
    handleLogin();
    return;
  }

  setShowOwnerContact(true);
}}
    >
      <span className="owner-contact-trigger-icon">☎</span>
      <span>Contact owner</span>
      <span className="owner-contact-trigger-arrow">→</span>
    </button>
  )}
</div>

{showOwnerContact && (
  <div className="owner-contact-card">
    <div className="owner-contact-header">
      <div>
        <span className="owner-contact-eyebrow">
          OWNER CONTACT
        </span>

        <h3>Talk to the property owner</h3>
      </div>

      <button
        type="button"
        className="owner-contact-close"
        onClick={() => setShowOwnerContact(false)}
        aria-label="Close owner contact"
      >
        ×
      </button>
    </div>

    <div className="owner-contact-person">
      <div className="owner-contact-avatar">
        👤
      </div>

      <div>
        <strong>Property Owner</strong>
        <span>{selectedProperty.name}</span>
      </div>
    </div>

    <div className="owner-contact-number">
      <span>Mobile number</span>
      <strong>
  {selectedProperty.contactNumber || "Contact number unavailable"}
</strong>
    </div>

    <a
  className="owner-call-button"
  href={`tel:${(selectedProperty.contactNumber || "").replace(/\s+/g, "")}`}
>
      <span>📞</span>
      Call owner
    </a>

    <button
      type="button"
      className="owner-contact-secondary"
      onClick={() => setShowOwnerContact(false)}
    >
      Back
    </button>
  </div>
)}
                </div>
      </div>
    </div>
  
)}
{showPropertyMap && selectedProperty && (
  <div
    className="property-map-overlay"
    onClick={() => setShowPropertyMap(false)}
  >
    <div
      className="property-map-modal"
      onClick={(event) => event.stopPropagation()}
    >
      <div className="property-map-header">
        <div>
          <span className="property-map-eyebrow">
            LOCATION
          </span>

          <h2>{selectedProperty.name}</h2>

          <p>
            {selectedProperty.location}
          </p>
        </div>

        <button
          type="button"
          className="property-map-close"
          onClick={() => setShowPropertyMap(false)}
          aria-label="Close map"
        >
          ×
        </button>
      </div>

      <div className="property-map-summary">
        <div className="property-map-summary-item">
          <span className="property-map-summary-icon">⌖</span>

          <div>
            <strong>
              {selectedProperty.distanceFromCollege} km
            </strong>

            <span>
              from {selectedProperty.college}
            </span>
          </div>
        </div>

        <div className="property-map-summary-item">
          <span className="property-map-summary-icon">★</span>

          <div>
            <strong>{selectedProperty.rating}</strong>

            <span>
              {selectedProperty.reviews} reviews
            </span>
          </div>
        </div>

        <div className="property-map-summary-item">
          <span className="property-map-summary-icon">₹</span>

          <div>
            <strong>
              ₹
              {Math.min(
                ...selectedProperty.rooms.map(
                  (room) => room.price
                )
              ).toLocaleString("en-IN")}
            </strong>

            <span>starting / month</span>
          </div>
        </div>
      </div>

      <div className="property-map-container">
        <MapContainer
          center={[
            selectedProperty.latitude,
            selectedProperty.longitude,
          ]}
          zoom={16}
          scrollWheelZoom={true}
          className="property-map"
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          <Marker
            position={[
              selectedProperty.latitude,
              selectedProperty.longitude,
            ]}
          >
            <Popup>
              <strong>{selectedProperty.name}</strong>
              <br />
              {selectedProperty.location}
            </Popup>
          </Marker>
        </MapContainer>

        <div className="property-map-location-card">
          <span className="property-map-location-icon">
            ⌖
          </span>

          <div>
            <strong>{selectedProperty.name}</strong>
            <span>{selectedProperty.location}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
)}

{showComparePanel && (
  <div
    className="compare-modal-backdrop"
    onClick={() => setShowComparePanel(false)}
  >
    <div
      className="compare-modal"
      role="dialog"
      aria-modal="true"
      aria-labelledby="compare-modal-title"
      onClick={(event) => event.stopPropagation()}
    >
      {/* HEADER */}
      <div className="compare-modal-header">
        <div>
          <span className="compare-modal-eyebrow">
            STAY COMPARISON
          </span>

          <h2 id="compare-modal-title">
            Compare your options
          </h2>

          <p>
            See the differences at a glance and choose the
            stay that fits you best.
          </p>
        </div>

        <button
          type="button"
          className="compare-modal-close"
          onClick={() => setShowComparePanel(false)}
          aria-label="Close comparison"
        >
          ×
        </button>
      </div>

      {/* COMPARISON */}
      <div className="compare-table-wrapper">
        <div className="compare-table">

          {/* PROPERTY */}
          <div className="compare-row compare-property-row">
            <div className="compare-label-cell">
              <span>Property</span>
            </div>

            {compareProperties.map((property) => {
              const rooms = Array.isArray(property.rooms)
                ? property.rooms
                : [];

              const prices = rooms
                .map((room) => room.price)
                .filter((price) => Number.isFinite(price));

              const minimumPrice =
                prices.length > 0
                  ? Math.min(...prices)
                  : null;

              return (
                <div
                  className="compare-property-cell"
                  key={property.id}
                >
                  <div
                    className="compare-property-image"
                    style={{
                      backgroundImage: `url(${property.image})`,
                    }}
                  />

                  <div className="compare-property-info">
                    <div className="compare-property-title-row">
                      <h3>{property.name}</h3>

                      <span>{property.type}</span>
                    </div>

                    <p>
                      <span>⌖</span>
                      {property.location}
                    </p>

                    {minimumPrice !== null && (
                      <strong>
                        ₹
                        {minimumPrice.toLocaleString("en-IN")}
                        <small>/month</small>
                      </strong>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* RATING */}
          <div className="compare-row">
            <div className="compare-label-cell">
              <span>Rating</span>
            </div>

            {compareProperties.map((property) => (
              <div
                className="compare-value-cell"
                key={property.id}
              >
                <span className="compare-rating">
                  ★ {property.rating}
                </span>

                <span className="compare-muted">
                  ({property.reviews} reviews)
                </span>
              </div>
            ))}
          </div>

          {/* DISTANCE */}
          <div className="compare-row">
            <div className="compare-label-cell">
              <span>Distance</span>
            </div>

            {compareProperties.map((property) => (
              <div
                className="compare-value-cell"
                key={property.id}
              >
                <strong>
                  {property.distanceFromCollege} km
                </strong>

                <span className="compare-muted">
                  from {property.college}
                </span>
              </div>
            ))}
          </div>

          {/* AVAILABILITY */}
          <div className="compare-row">
            <div className="compare-label-cell">
              <span>Availability</span>
            </div>

            {compareProperties.map((property) => (
              <div
                className="compare-value-cell"
                key={property.id}
              >
                <span className="compare-availability">
                  <span />
                  {property.availability}
                </span>
              </div>
            ))}
          </div>

          {/* ROOM OPTIONS */}
          <div className="compare-row">
            <div className="compare-label-cell">
              <span>Room options</span>
            </div>

            {compareProperties.map((property) => (
              <div
                className="compare-value-cell compare-room-cell"
                key={property.id}
              >
                {Array.isArray(property.rooms) &&
                property.rooms.length > 0 ? (
                  property.rooms.map((room) => (
                    <span
                      className="compare-room-chip"
                      key={room.id}
                    >
                      {room.shortLabel}
                    </span>
                  ))
                ) : (
                  <span className="compare-muted">
                    Not available
                  </span>
                )}
              </div>
            ))}
          </div>

          {/* AMENITIES */}
          {[
            "Wi-Fi",
            "AC",
            "Food",
            "Laundry",
            "Housekeeping",
            "Gym",
            "Parking",
            "Power backup",
            "CCTV",
          ].map((amenity) => (
            <div
              className="compare-row compare-amenity-row"
              key={amenity}
            >
              <div className="compare-label-cell">
                <span>{amenity}</span>
              </div>

              {compareProperties.map((property) => {
                const hasAmenity =
                  Array.isArray(property.amenities) &&
                  property.amenities.includes(amenity);

                return (
                  <div
                    className="compare-value-cell"
                    key={property.id}
                  >
                    <span
                      className={`compare-amenity-status ${
                        hasAmenity
                          ? "available"
                          : "unavailable"
                      }`}
                    >
                      {hasAmenity ? "✓" : "—"}
                    </span>
                  </div>
                );
              })}
            </div>
          ))}

          {/* FOOD */}
          <div className="compare-row">
            <div className="compare-label-cell">
              <span>Food details</span>
            </div>

            {compareProperties.map((property) => (
              <div
                className="compare-value-cell compare-text-cell"
                key={property.id}
              >
                {property.details?.food || "Not specified"}
              </div>
            ))}
          </div>

          {/* SECURITY */}
          <div className="compare-row">
            <div className="compare-label-cell">
              <span>Security</span>
            </div>

            {compareProperties.map((property) => (
              <div
                className="compare-value-cell compare-text-cell"
                key={property.id}
              >
                {property.details?.security || "Not specified"}
              </div>
            ))}
          </div>

          {/* DEPOSIT */}
          <div className="compare-row">
            <div className="compare-label-cell">
              <span>Security deposit</span>
            </div>

            {compareProperties.map((property) => (
              <div
                className="compare-value-cell compare-text-cell"
                key={property.id}
              >
                {property.details?.deposit || "Not specified"}
              </div>
            ))}
          </div>

          {/* RULES */}
          <div className="compare-row compare-last-row">
            <div className="compare-label-cell">
              <span>House rules</span>
            </div>

            {compareProperties.map((property) => (
              <div
                className="compare-value-cell compare-text-cell"
                key={property.id}
              >
                {property.details?.rules || "Not specified"}
              </div>
            ))}
          </div>

        </div>
      </div>

      {/* FOOTER */}
      <div className="compare-modal-footer">
        <span>
          Comparing {compareProperties.length} stays
        </span>

        <div className="compare-footer-actions">
          <button
            type="button"
            className="compare-footer-clear"
            onClick={() => {
              setCompareProperties([]);
              setShowComparePanel(false);
            }}
          >
            Clear comparison
          </button>

          <button
            type="button"
            className="compare-footer-close"
            onClick={() => setShowComparePanel(false)}
          >
            Done
          </button>
        </div>
      </div>
    </div>
</div>
)}

{showAuthModal && (
  <div
    className="auth-modal-overlay"
    onClick={() => {
      if (!authLoading) {
        setShowAuthModal(false);
        setAuthError("");
        setAuthMessage("");
      }
    }}
  >
    <div
      className="auth-modal"
      onClick={(event) => event.stopPropagation()}
    >
      <button
        type="button"
        className="auth-modal-close"
        onClick={() => {
          if (!authLoading) {
            setShowAuthModal(false);
            setAuthError("");
            setAuthMessage("");
          }
        }}
        aria-label="Close authentication modal"
      >
        ×
      </button>

      <div className="auth-modal-header">
        <span className="auth-modal-eyebrow">
          FINDYOURHOSTEL
        </span>

        <h2>
          {authMode === "login"
            ? "Welcome back"
            : "Create your account"}
        </h2>

        <p>
          {authMode === "login"
            ? "Log in to save stays, contact owners and manage your account."
            : "Create one account to save stays, contact owners and list your property."}
        </p>
      </div>

      <div className="auth-mode-switch">
        <button
          type="button"
          className={
            authMode === "login"
              ? "auth-mode-button active"
              : "auth-mode-button"
          }
          onClick={() => {
            setAuthMode("login");
            setAuthError("");
            setAuthMessage("");
          }}
          disabled={authLoading}
        >
          Log in
        </button>

        <button
          type="button"
          className={
            authMode === "signup"
              ? "auth-mode-button active"
              : "auth-mode-button"
          }
          onClick={() => {
            setAuthMode("signup");
            setAuthError("");
            setAuthMessage("");
          }}
          disabled={authLoading}
        >
          Sign up
        </button>
      </div>

      <form
        className="auth-form"
        onSubmit={handleAuthSubmit}
      >
        {authMode === "signup" && (
          <div className="auth-form-field">
            <label htmlFor="auth-name">
              Full name
            </label>

            <input
              id="auth-name"
              name="name"
              type="text"
              placeholder="Enter your full name"
              autoComplete="name"
              required
              disabled={authLoading}
            />
          </div>
        )}

        <div className="auth-form-field">
          <label htmlFor="auth-email">
            Email address
          </label>

          <input
            id="auth-email"
            name="email"
            type="email"
            placeholder="you@example.com"
            autoComplete="email"
            required
            disabled={authLoading}
          />
        </div>

        {authMode === "signup" && (
          <div className="auth-form-field">
            <label htmlFor="auth-phone">
              Phone number
            </label>

            <input
              id="auth-phone"
              name="phone"
              type="tel"
              placeholder="Enter your phone number"
              autoComplete="tel"
              maxLength="15"
              disabled={authLoading}
            />
          </div>
        )}

        <div className="auth-form-field">
          <label htmlFor="auth-password">
            Password
          </label>

          <input
            id="auth-password"
            name="password"
            type="password"
            placeholder="Enter your password"
            autoComplete={
              authMode === "login"
                ? "current-password"
                : "new-password"
            }
            minLength="6"
            required
            disabled={authLoading}
          />
        </div>

        {authError && (
          <div className="auth-form-message error">
            {authError}
          </div>
        )}

        {authMessage && (
          <div className="auth-form-message success">
            {authMessage}
          </div>
        )}

        <button
          type="submit"
          className="auth-submit-button"
          disabled={authLoading}
        >
          {authLoading ? (
            <span className="auth-submit-loading">
              <span className="auth-spinner" />
              {authMode === "login"
                ? "Logging in..."
                : "Creating account..."}
            </span>
          ) : (
            authMode === "login"
              ? "Log in"
              : "Create account"
          )}
        </button>
      </form>

      <div className="auth-modal-footer">
        <span>
          {authMode === "login"
            ? "New to FindYourHostel?"
            : "Already have an account?"}
        </span>

        <button
          type="button"
          onClick={() => {
            setAuthMode(
              authMode === "login"
                ? "signup"
                : "login"
            );
            setAuthError("");
            setAuthMessage("");
          }}
          disabled={authLoading}
        >
          {authMode === "login"
            ? "Create an account"
            : "Log in instead"}
        </button>
      </div>
    </div>
  </div>
)}

</main>
  );
}

export default App;
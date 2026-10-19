function PropertyCard({
  property,
  onViewDetails,
  onViewMap,
  isSaved,
  onToggleSave,
  isCompared,
  onToggleCompare,
}) {
  const rooms = Array.isArray(property.rooms)
    ? property.rooms
    : [];

  const prices = rooms
    .map((room) => room.price)
    .filter((price) => Number.isFinite(price));

  const minimumPrice =
    prices.length > 0 ? Math.min(...prices) : null;

  const hasReviews =
    Number.isFinite(Number(property.rating)) &&
    Number(property.reviews) > 0;

  const isVerified =
    property.verificationStatus === "VERIFIED" ||
    property.verified === true;

  const hasImage =
    typeof property.image === "string" &&
    property.image.trim() !== "";

  const hasTag =
    typeof property.tag === "string" &&
    property.tag.trim() !== "";

  const handleSave = () => {
    if (onToggleSave) {
      onToggleSave(property);
    }
  };

  const handleViewDetails = () => {
    if (onViewDetails) {
      onViewDetails(property);
    }
  };

  const handleViewMap = () => {
    if (onViewMap) {
      onViewMap(property);
    }
  };

  return (
    <article className="listing-card">
      {/* =====================================================
          IMAGE
          ===================================================== */}

      <div
        className={`listing-image ${
          !hasImage ? "listing-image-placeholder" : ""
        }`}
        style={
          hasImage
            ? {
                backgroundImage: `url(${property.image})`,
              }
            : undefined
        }
      >
        {hasImage ? (
          <div className="listing-image-overlay" />
        ) : (
          <div className="listing-image-empty">
            <div className="listing-image-empty-icon">
              🏠
            </div>

            <strong>Photos coming soon</strong>

            <span>
              Property images will be added shortly
            </span>
          </div>
        )}

        <div className="listing-top-row">
          {hasTag ? (
            <span className="listing-tag">
              {property.tag}
            </span>
          ) : (
            <span className="listing-tag listing-tag-placeholder">
              New listing
            </span>
          )}

          <div className="listing-card-actions">
            <button
              className={`listing-compare ${
                isCompared ? "active" : ""
              }`}
              type="button"
              onClick={() => {
                if (onToggleCompare) {
                  onToggleCompare(property);
                }
              }}
              aria-label={
                isCompared
                  ? `Remove ${property.name} from comparison`
                  : `Add ${property.name} to comparison`
              }
              aria-pressed={isCompared}
            >
              <span className="listing-compare-check">
                {isCompared ? "✓" : ""}
              </span>

              <span>Compare</span>
            </button>

            <button
              className={`listing-heart ${
                isSaved ? "saved" : ""
              }`}
              type="button"
              onClick={handleSave}
              aria-label={
                isSaved
                  ? `Remove ${property.name} from saved listings`
                  : `Save ${property.name}`
              }
              aria-pressed={isSaved}
            >
              <span>
                {isSaved ? "♥" : "♡"}
              </span>
            </button>
          </div>
        </div>

        <div className="listing-image-bottom">
          {isVerified ? (
            <span className="verified-badge">
              <span className="verified-icon">
                ✓
              </span>

              Verified stay
            </span>
          ) : (
            <span className="pending-badge">
              <span className="pending-icon">
                ◷
              </span>

              Pending verification
            </span>
          )}
        </div>
      </div>

      {/* =====================================================
          CONTENT
          ===================================================== */}

      <div className="listing-content">
        {/* =====================================================
            RATING + AVAILABILITY
            ===================================================== */}

        <div className="listing-rating-row">
          {hasReviews ? (
            <div className="listing-rating">
              <span className="rating-star">
                ★
              </span>

              <strong>
                {Number(property.rating).toFixed(1)}
              </strong>

              <span className="review-count">
                ({Number(property.reviews)} reviews)
              </span>
            </div>
          ) : (
            <div className="listing-no-reviews">
              <span>No reviews yet</span>
            </div>
          )}

          <span className="listing-status">
            <span className="status-dot" />
            {property.availability}
          </span>
        </div>

        {/* =====================================================
            PROPERTY NAME + TYPE + MAP
            ===================================================== */}

        <div className="listing-heading">
          <div className="listing-title-row">
            <h3>
              {property.name}
            </h3>

            <div className="listing-type-block">
              <span className="property-type">
                {property.type}
              </span>

              <button
                type="button"
                className="listing-map-button"
                onClick={handleViewMap}
                aria-label={`View ${property.name} on map`}
              >
                <span>⌖</span>
                Map
              </button>
            </div>
          </div>

          <div className="listing-location-wrapper">
            <p className="listing-location">
              <span className="location-icon">
                ⌖
              </span>

              {property.location}
            </p>

            {property.distanceFromCollege !== null &&
              property.distanceFromCollege !== undefined &&
              property.college && (
                <p className="listing-college">
                  <span className="college-icon">
                    🎓
                  </span>

                  {property.distanceFromCollege} km from{" "}
                  {property.college}
                </p>
              )}
          </div>
        </div>

        {/* =====================================================
            ROOM OPTIONS
            ===================================================== */}

        <div className="listing-room-section">
          <span className="room-section-label">
            Room options
          </span>

          <div className="listing-room-options">
            {rooms.length > 0 ? (
              rooms.map((room) => (
                <span
                  className="room-option-chip"
                  key={room.id}
                  title={`${room.type} — ₹${room.price.toLocaleString(
                    "en-IN"
                  )}/month`}
                >
                  {room.shortLabel}
                </span>
              ))
            ) : (
              <span className="room-options-unavailable">
                Room options coming soon
              </span>
            )}
          </div>
        </div>

        {/* =====================================================
            PRICE + CTA
            ===================================================== */}

        <div className="listing-footer">
          <div className="listing-price-block">
            <span className="listing-price-prefix">
              Starting from
            </span>

            <div className="listing-price">
              <strong>
                {minimumPrice !== null
                  ? `₹${minimumPrice.toLocaleString(
                      "en-IN"
                    )}`
                  : "Price unavailable"}
              </strong>

              {minimumPrice !== null && (
                <span>
                  / month
                </span>
              )}
            </div>
          </div>

          <button
            className="listing-details-button"
            type="button"
            onClick={handleViewDetails}
          >
            View details
            <span>→</span>
          </button>
        </div>
      </div>
    </article>
  );
}

export default PropertyCard;
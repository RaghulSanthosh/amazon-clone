import React, { useState } from 'react';
import Icon from 'components/AppIcon';
import Image from 'components/AppImage';

const ProductImageGallery = ({ images, title }) => {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);

  const handlePrevImage = () => {
    setSelectedImageIndex((prev) => 
      prev === 0 ? images.length - 1 : prev - 1
    );
  };

  const handleNextImage = () => {
    setSelectedImageIndex((prev) => 
      prev === images.length - 1 ? 0 : prev + 1
    );
  };

  const handleThumbnailClick = (index) => {
    setSelectedImageIndex(index);
  };

  const toggleZoom = () => {
    setIsZoomed(!isZoomed);
  };

  return (
    <div className="space-y-4">
      {/* Main Image */}
      <div className="relative bg-surface rounded-lg overflow-hidden border border-border">
        <div className="aspect-square relative group">
          <Image
            src={images[selectedImageIndex]}
            alt={`${title} - Image ${selectedImageIndex + 1}`}
            className={`w-full h-full object-cover transition-transform duration-300 cursor-zoom-in ${
              isZoomed ? 'scale-150' : 'scale-100'
            }`}
            onClick={toggleZoom}
          />
          
          {/* Navigation Arrows */}
          {images.length > 1 && (
            <>
              <button
                onClick={handlePrevImage}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 w-10 h-10 bg-surface/80 hover:bg-surface rounded-full flex items-center justify-center shadow-md opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <Icon name="ChevronLeft" size={20} className="text-text-primary" />
              </button>
              <button
                onClick={handleNextImage}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 w-10 h-10 bg-surface/80 hover:bg-surface rounded-full flex items-center justify-center shadow-md opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <Icon name="ChevronRight" size={20} className="text-text-primary" />
              </button>
            </>
          )}
          
          {/* Zoom Icon */}
          <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
            <div className="bg-surface/80 rounded-full p-2">
              <Icon name={isZoomed ? "ZoomOut" : "ZoomIn"} size={16} className="text-text-primary" />
            </div>
          </div>
          
          {/* Image Counter */}
          {images.length > 1 && (
            <div className="absolute bottom-4 right-4 bg-text-primary/80 text-white px-3 py-1 rounded-full text-sm">
              {selectedImageIndex + 1} / {images.length}
            </div>
          )}
        </div>
      </div>
      
      {/* Thumbnail Images */}
      {images.length > 1 && (
        <div className="flex space-x-2 overflow-x-auto pb-2">
          {images.map((image, index) => (
            <button
              key={index}
              onClick={() => handleThumbnailClick(index)}
              className={`flex-shrink-0 w-16 h-16 sm:w-20 sm:h-20 rounded-lg overflow-hidden border-2 transition-all ${
                selectedImageIndex === index
                  ? 'border-primary shadow-md'
                  : 'border-border hover:border-secondary-300'
              }`}
            >
              <Image
                src={image}
                alt={`${title} - Thumbnail ${index + 1}`}
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>
      )}
      
      {/* Image Actions */}
      <div className="flex items-center justify-between pt-2">
        <div className="flex items-center space-x-4">
          <button className="flex items-center space-x-2 text-text-secondary hover:text-primary transition-smooth">
            <Icon name="Share2" size={16} />
            <span className="text-sm font-medium">Share</span>
          </button>
          <button className="flex items-center space-x-2 text-text-secondary hover:text-primary transition-smooth">
            <Icon name="Heart" size={16} />
            <span className="text-sm font-medium">Save</span>
          </button>
        </div>
        
        <button 
          onClick={toggleZoom}
          className="flex items-center space-x-2 text-text-secondary hover:text-primary transition-smooth"
        >
          <Icon name="Maximize2" size={16} />
          <span className="text-sm font-medium">Full Screen</span>
        </button>
      </div>
    </div>
  );
};

export default ProductImageGallery;
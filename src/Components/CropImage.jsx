import React, { useState, useRef, useEffect } from "react";

export default function CropImage() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [originalPreview, setOriginalPreview] = useState(null);
  const [convertedPreview, setConvertedPreview] = useState(null);
  const [originalDimensions, setOriginalDimensions] = useState({
    width: 0,
    height: 0,
  });
  const [convertedDimensions, setConvertedDimensions] = useState({
    width: 0,
    height: 0,
  });
  const [isConverting, setIsConverting] = useState(false);
  const [error, setError] = useState(null);
  const [fileName, setFileName] = useState("");

  // Resize settings
  const [targetWidth, setTargetWidth] = useState("");
  const [targetHeight, setTargetHeight] = useState("");

  // Format settings
  const [selectedFormat, setSelectedFormat] = useState("PNG");
  const [quality] = useState(90);

  // Effects settings - ADDED MISSING STATES
  const [showEffects, setShowEffects] = useState(false);
  const [brightness, setBrightness] = useState(100);
  const [contrast, setContrast] = useState(100);
  const [saturation, setSaturation] = useState(100);

  // Crop settings
  const [cropMode, setCropMode] = useState(false);
  const [cropArea, setCropArea] = useState({ x: 0, y: 0, width: 0, height: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const imageRef = useRef(null);
  const cropContainerRef = useRef(null);

  // Crop rectangle input values
  const [cropWidth, setCropWidth] = useState(215);
  const [cropHeight, setCropHeight] = useState(303);
  const [cropX, setCropX] = useState(57);
  const [cropY, setCropY] = useState(38);
  const [selectedRatio, setSelectedRatio] = useState("custom");

  const formats = ["PNG", "JPEG", "WebP", "BMP", "TIFF"];

  const aspectRatios = {
    "Paper A4 2480x3508": { width: 2480, height: 3508, ratio: 2480 / 3508 },
    "Square 1:1": { width: 1, height: 1, ratio: 1 },
    "16:9": { width: 16, height: 9, ratio: 16 / 9 },
    "4:3": { width: 4, height: 3, ratio: 4 / 3 },
    "3:2": { width: 3, height: 2, ratio: 3 / 2 },
  };

  useEffect(() => {
    return () => {
      if (originalPreview?.startsWith("blob:"))
        URL.revokeObjectURL(originalPreview);
      if (convertedPreview?.startsWith("blob:"))
        URL.revokeObjectURL(convertedPreview);
    };
  }, [originalPreview, convertedPreview]);

  const handleFileUpload = (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (file.size > 20 * 1024 * 1024) {
      setError("Max file size is 20 MB");
      return;
    }

    setError(null);
    setSelectedFile(file);
    setFileName(file.name);

    const objectUrl = URL.createObjectURL(file);
    setOriginalPreview(objectUrl);
    setConvertedPreview(null);

    const img = new Image();
    img.onload = () => {
      setOriginalDimensions({ width: img.width, height: img.height });
      setTargetWidth(img.width);
      setTargetHeight(img.height);
      setConvertedDimensions({ width: img.width, height: img.height });

      // Set default crop area to full image
      setCropArea({ x: 0, y: 0, width: img.width, height: img.height });
      setCropWidth(img.width);
      setCropHeight(img.height);
      setCropX(0);
      setCropY(0);
    };
    img.src = objectUrl;
  };

  // Crop rectangle handlers
  const handleCropWidthChange = (e) => {
    const width = parseInt(e.target.value) || 0;
    setCropWidth(width);
    if (selectedRatio !== "custom") {
      const ratio = aspectRatios[selectedRatio].ratio;
      setCropHeight(Math.round(width / ratio));
    }
  };

  const handleCropHeightChange = (e) => {
    const height = parseInt(e.target.value) || 0;
    setCropHeight(height);
    if (selectedRatio !== "custom") {
      const ratio = aspectRatios[selectedRatio].ratio;
      setCropWidth(Math.round(height * ratio));
    }
  };

  const handleRatioChange = (e) => {
    const ratio = e.target.value;
    setSelectedRatio(ratio);

    if (ratio !== "custom") {
      const { width, height } = aspectRatios[ratio];
      // Scale to fit within image bounds
      const maxDimension = Math.min(
        originalDimensions.width,
        originalDimensions.height,
      );
      const scale = maxDimension / Math.max(width, height);
      const newWidth = Math.min(width * scale, originalDimensions.width);
      const newHeight = Math.min(height * scale, originalDimensions.height);

      setCropWidth(Math.round(newWidth));
      setCropHeight(Math.round(newHeight));
    }
  };

  const handleCropXChange = (e) => {
    const x = parseInt(e.target.value) || 0;
    const maxX = originalDimensions.width - cropWidth;
    setCropX(Math.min(Math.max(0, x), maxX));
  };

  const handleCropYChange = (e) => {
    const y = parseInt(e.target.value) || 0;
    const maxY = originalDimensions.height - cropHeight;
    setCropY(Math.min(Math.max(0, y), maxY));
  };

  // Apply crop from rectangle inputs
  const applyCropFromInputs = async () => {
    if (!originalPreview || cropWidth <= 0 || cropHeight <= 0) return;

    const img = new Image();
    img.src = originalPreview;
    await new Promise((resolve) => {
      img.onload = resolve;
    });

    const canvas = document.createElement("canvas");
    canvas.width = cropWidth;
    canvas.height = cropHeight;
    const ctx = canvas.getContext("2d");

    ctx.drawImage(
      img,
      cropX,
      cropY,
      cropWidth,
      cropHeight,
      0,
      0,
      cropWidth,
      cropHeight,
    );

    const croppedUrl = canvas.toDataURL("image/png");
    setOriginalPreview(croppedUrl);
    setOriginalDimensions({ width: cropWidth, height: cropHeight });
    setTargetWidth(cropWidth);
    setTargetHeight(cropHeight);
    setConvertedDimensions({ width: cropWidth, height: cropHeight });
    setCropArea({ x: cropX, y: cropY, width: cropWidth, height: cropHeight });
  };

  // Interactive crop handlers
  const startCrop = (e) => {
    if (!cropMode || !imageRef.current) return;
    const rect = cropContainerRef.current.getBoundingClientRect();
    const imgRect = imageRef.current.getBoundingClientRect();
    const scaleX = originalDimensions.width / imgRect.width;
    const scaleY = originalDimensions.height / imgRect.height;

    const startX = (e.clientX - rect.left) * scaleX;
    const startY = (e.clientY - rect.top) * scaleY;

    setIsDragging(true);
    setDragStart({ x: startX, y: startY });
    setCropArea({ x: startX, y: startY, width: 0, height: 0 });
  };

  const updateCrop = (e) => {
    if (!isDragging || !cropMode) return;
    const rect = cropContainerRef.current.getBoundingClientRect();
    const imgRect = imageRef.current.getBoundingClientRect();
    const scaleX = originalDimensions.width / imgRect.width;
    const scaleY = originalDimensions.height / imgRect.height;

    const currentX = (e.clientX - rect.left) * scaleX;
    const currentY = (e.clientY - rect.top) * scaleY;

    const width = currentX - dragStart.x;
    const height = currentY - dragStart.y;

    const newCropArea = {
      x: Math.max(0, Math.min(dragStart.x, originalDimensions.width)),
      y: Math.max(0, Math.min(dragStart.y, originalDimensions.height)),
      width: Math.min(Math.abs(width), originalDimensions.width - dragStart.x),
      height: Math.min(
        Math.abs(height),
        originalDimensions.height - dragStart.y,
      ),
    };

    if (width < 0) {
      newCropArea.x = Math.max(0, currentX);
    }
    if (height < 0) {
      newCropArea.y = Math.max(0, currentY);
    }

    setCropArea(newCropArea);
  };

  const endCrop = () => {
    setIsDragging(false);
  };

  const applyCrop = async () => {
    if (!originalPreview || cropArea.width <= 0 || cropArea.height <= 0) return;

    const img = new Image();
    img.src = originalPreview;
    await new Promise((resolve) => {
      img.onload = resolve;
    });

    const canvas = document.createElement("canvas");
    canvas.width = cropArea.width;
    canvas.height = cropArea.height;
    const ctx = canvas.getContext("2d");

    ctx.drawImage(
      img,
      cropArea.x,
      cropArea.y,
      cropArea.width,
      cropArea.height,
      0,
      0,
      cropArea.width,
      cropArea.height,
    );

    const croppedUrl = canvas.toDataURL("image/png");
    setOriginalPreview(croppedUrl);
    setOriginalDimensions({ width: cropArea.width, height: cropArea.height });
    setTargetWidth(cropArea.width);
    setTargetHeight(cropArea.height);
    setConvertedDimensions({ width: cropArea.width, height: cropArea.height });
    setCropWidth(cropArea.width);
    setCropHeight(cropArea.height);
    setCropX(0);
    setCropY(0);
    setCropMode(false);
  };

  const convertImage = async () => {
    if (!originalPreview) return;

    setIsConverting(true);
    setError(null);

    try {
      const img = new Image();
      img.src = originalPreview;
      await new Promise((resolve, reject) => {
        img.onload = resolve;
        img.onerror = reject;
      });

      const canvas = document.createElement("canvas");
      canvas.width = targetWidth;
      canvas.height = targetHeight;
      const ctx = canvas.getContext("2d");

      // Apply filters
      if (
        showEffects &&
        (brightness !== 100 || contrast !== 100 || saturation !== 100)
      ) {
        ctx.filter = `brightness(${brightness}%) contrast(${contrast}%) saturate(${saturation}%)`;
      }

      ctx.drawImage(img, 0, 0, targetWidth, targetHeight);

      const mimeTypes = {
        PNG: "image/png",
        JPEG: "image/jpeg",
        WebP: "image/webp",
        BMP: "image/bmp",
        TIFF: "image/tiff",
      };

      let convertedUrl;
      if (selectedFormat === "JPEG" || selectedFormat === "WebP") {
        convertedUrl = canvas.toDataURL(
          mimeTypes[selectedFormat],
          quality / 100,
        );
      } else {
        convertedUrl = canvas.toDataURL(mimeTypes[selectedFormat]);
      }

      setConvertedPreview(convertedUrl);
    } catch (err) {
      console.error("Conversion error:", err);
      setError("Conversion failed: " + err.message);
    } finally {
      setIsConverting(false);
    }
  };

  const downloadImage = () => {
    if (!convertedPreview) return;

    const link = document.createElement("a");
    const baseName = fileName.replace(/\.[^/.]+$/, "");
    link.download = `${baseName}_converted.${selectedFormat.toLowerCase()}`;
    link.href = convertedPreview;
    link.click();
  };

  const triggerFileInput = () => {
    document.getElementById("file-input")?.click();
  };

  const clearAll = () => {
    setSelectedFile(null);
    setOriginalPreview(null);
    setConvertedPreview(null);
    setError(null);
    setFileName("");
    setCropMode(false);
    setCropWidth(215);
    setCropHeight(303);
    setCropX(57);
    setCropY(38);
    if (document.getElementById("file-input")) {
      document.getElementById("file-input").value = "";
    }
  };

  return (
    <div className="relative max-w-7xl mx-auto px-4 py-8 z-10">
      <div className="grid lg:grid-cols-12 gap-6">
        {/* Sidebar Controls */}
        <div className="lg:col-span-4">
          <div
            className="backdrop-blur-xl bg-black/40 rounded-2xl border border-white/10 p-6 space-y-6 overflow-y-auto"
            style={{ maxHeight: "80vh" }}
          >
            {/* Upload Area */}
            <div className="relative">
              <input
                id="file-input"
                type="file"
                accept="image/*"
                onChange={handleFileUpload}
                className="hidden"
              />
              <button
                onClick={triggerFileInput}
                className="w-full py-8 rounded-xl border-2 border-dashed border-purple-500/50 hover:border-purple-500 transition-all group"
              >
                <div className="text-3xl mb-2 group-hover:scale-110 transition-transform">
                  📸
                </div>
                <p className="text-white font-semibold text-sm">
                  Drop image or click to upload
                </p>
                <p className="text-gray-400 text-xs mt-1">
                  Max 20MB • All formats supported
                </p>
              </button>
              {fileName && (
                <div className="mt-3 text-xs text-gray-300 flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse"></div>
                  {fileName}
                </div>
              )}
            </div>
            {selectedFile && (
              <div className="flex gap-3 pt-4">
                <button
                  onClick={clearAll}
                  className="flex-1 py-2.5 rounded-xl bg-white/10 text-white font-semibold text-sm hover:bg-white/20 transition-all"
                >
                  Clear
                </button>
              </div>
            )}

            {/* Format Selection */}
            <div className="space-y-3">
              <h3 className="text-white font-semibold text-sm flex items-center gap-2">
                <span className="w-1 h-4 bg-purple-500 rounded-full"></span>
                Output Format
              </h3>
              <div className="grid grid-cols-3 gap-2">
                {formats.slice(0, 5).map((format) => (
                  <button
                    key={format}
                    onClick={() => setSelectedFormat(format)}
                    className={`px-2 py-1.5 rounded-lg text-xs transition-all ${
                      selectedFormat === format
                        ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg"
                        : "bg-white/5 text-gray-300 hover:bg-white/10"
                    }`}
                  >
                    {format}
                  </button>
                ))}
              </div>
            </div>

            {/* Crop Rectangle */}
            <div className="space-y-3">
              <h3 className="text-white font-semibold text-sm flex items-center gap-2">
                <span className="w-1 h-4 bg-purple-500 rounded-full"></span>
                Crop Rectangle
              </h3>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs text-gray-400 block mb-1">
                    Width (px)
                  </label>
                  <input
                    type="number"
                    value={cropWidth}
                    onChange={handleCropWidthChange}
                    className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white text-sm"
                  />
                </div>
                <div>
                  <label className="text-xs text-gray-400 block mb-1">
                    Height (px)
                  </label>
                  <input
                    type="number"
                    value={cropHeight}
                    onChange={handleCropHeightChange}
                    className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white text-sm"
                  />
                </div>
              </div>

              <select
                value={selectedRatio}
                onChange={handleRatioChange}
                className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white text-sm"
              >
                <option value="custom">Custom Ratio</option>
                {Object.keys(aspectRatios).map((ratio) => (
                  <option key={ratio} value={ratio}>
                    {ratio}
                  </option>
                ))}
              </select>
            </div>

            {/* Crop Position */}
            <div className="space-y-3">
              <h3 className="text-white font-semibold text-sm flex items-center gap-2">
                <span className="w-1 h-4 bg-purple-500 rounded-full"></span>
                Crop Position
              </h3>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs text-gray-400 block mb-1">
                    X Position (px)
                  </label>
                  <input
                    type="number"
                    value={cropX}
                    onChange={handleCropXChange}
                    className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white text-sm"
                  />
                </div>
                <div>
                  <label className="text-xs text-gray-400 block mb-1">
                    Y Position (px)
                  </label>
                  <input
                    type="number"
                    value={cropY}
                    onChange={handleCropYChange}
                    className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white text-sm"
                  />
                </div>
              </div>
            </div>

            {/* Crop Mode Toggle */}
            <button
              onClick={() => setCropMode(!cropMode)}
              className={`w-full py-2.5 rounded-xl text-sm transition-all ${
                cropMode
                  ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg"
                  : "bg-white/10 text-gray-300 hover:bg-white/20"
              }`}
            >
              {cropMode
                ? "✂️ Interactive Mode Active"
                : "✂️ Enable Interactive Crop"}
            </button>

            {/* Effects Toggle */}
            <button
              onClick={() => setShowEffects(!showEffects)}
              className="w-full py-2.5 rounded-xl bg-white/10 text-gray-300 hover:bg-white/20 transition-all text-sm"
            >
              {showEffects ? "🎨 Effects Active" : "🎨 Advanced Effects"}
            </button>

            {showEffects && (
              <div className="space-y-3 animate-in slide-in-from-top-2">
                <div>
                  <label className="text-xs text-gray-300">
                    Brightness: {brightness}%
                  </label>
                  <input
                    type="range"
                    min="0"
                    max="200"
                    value={brightness}
                    onChange={(e) => setBrightness(parseInt(e.target.value))}
                    className="w-full accent-purple-500"
                  />
                </div>
                <div>
                  <label className="text-xs text-gray-300">
                    Contrast: {contrast}%
                  </label>
                  <input
                    type="range"
                    min="0"
                    max="200"
                    value={contrast}
                    onChange={(e) => setContrast(parseInt(e.target.value))}
                    className="w-full accent-purple-500"
                  />
                </div>
                <div>
                  <label className="text-xs text-gray-300">
                    Saturation: {saturation}%
                  </label>
                  <input
                    type="range"
                    min="0"
                    max="200"
                    value={saturation}
                    onChange={(e) => setSaturation(parseInt(e.target.value))}
                    className="w-full accent-purple-500"
                  />
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex gap-3 pt-4">
              <button
                onClick={applyCropFromInputs}
                disabled={!originalPreview}
                className="flex-1 py-2.5 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold text-sm hover:shadow-lg transition-all disabled:opacity-50"
              >
                ✂️ Apply Crop
              </button>

              <button
                onClick={clearAll}
                className="flex-1 py-2.5 rounded-xl bg-white/10 text-white font-semibold text-sm hover:bg-white/20 transition-all"
              >
                Reset
              </button>
            </div>

            <div className="flex gap-3">
              <button
                onClick={convertImage}
                disabled={!originalPreview || isConverting}
                className="flex-1 py-2.5 rounded-xl bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-semibold text-sm hover:shadow-lg transition-all disabled:opacity-50"
              >
                {isConverting ? "Processing..." : "⚡ Convert & Export"}
              </button>

              {convertedPreview && (
                <button
                  onClick={downloadImage}
                  className="flex-1 py-2.5 rounded-xl bg-green-500/20 border border-green-500 text-green-400 font-semibold text-sm hover:bg-green-500/30 transition-all"
                >
                  💾 Download
                </button>
              )}
            </div>

            {error && (
              <div className="bg-red-500/20 border border-red-500 rounded-lg p-3 text-red-300 text-xs">
                ⚠️ {error}
              </div>
            )}
          </div>
        </div>

        {/* Preview Area */}
        <div className="lg:col-span-8">
          <div className="grid md:grid-cols-2 gap-6">
            {/* Original Image */}
            <div className="backdrop-blur-xl bg-black/40 rounded-2xl border border-white/10 p-4">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-white font-semibold text-sm">Original</h3>
                {originalDimensions.width > 0 && (
                  <span className="text-xs text-gray-400 bg-white/10 px-2 py-1 rounded-full">
                    {originalDimensions.width}×{originalDimensions.height}
                  </span>
                )}
              </div>
              <div
                ref={cropContainerRef}
                className={`relative rounded-xl overflow-hidden bg-black/50 flex items-center justify-center min-h-[300px] ${
                  cropMode ? "cursor-crosshair" : ""
                }`}
                onMouseDown={startCrop}
                onMouseMove={updateCrop}
                onMouseUp={endCrop}
              >
                {originalPreview ? (
                  <>
                    <img
                      ref={imageRef}
                      src={originalPreview}
                      alt="Original"
                      className="max-w-full max-h-[350px] object-contain"
                    />
                    {/* Crop Overlay for interactive mode */}
                    {cropMode && cropArea.width > 0 && (
                      <div
                        className="absolute border-2 border-purple-500 bg-purple-500/30"
                        style={{
                          left: `${(cropArea.x / originalDimensions.width) * 100}%`,
                          top: `${(cropArea.y / originalDimensions.height) * 100}%`,
                          width: `${(cropArea.width / originalDimensions.width) * 100}%`,
                          height: `${(cropArea.height / originalDimensions.height) * 100}%`,
                        }}
                      >
                        {/* Grid overlay */}
                        <div className="absolute inset-0 grid grid-cols-3 grid-rows-3">
                          {[...Array(9)].map((_, i) => (
                            <div
                              key={i}
                              className="border border-white/30"
                            ></div>
                          ))}
                        </div>
                        {/* Corner handles */}
                        <div className="absolute -top-1 -left-1 w-2 h-2 bg-white rounded-full"></div>
                        <div className="absolute -top-1 -right-1 w-2 h-2 bg-white rounded-full"></div>
                        <div className="absolute -bottom-1 -left-1 w-2 h-2 bg-white rounded-full"></div>
                        <div className="absolute -bottom-1 -right-1 w-2 h-2 bg-white rounded-full"></div>
                      </div>
                    )}
                    {/* Rectangle crop overlay for manual input */}
                    {!cropMode && cropWidth > 0 && cropHeight > 0 && (
                      <div
                        className="absolute border-2 border-yellow-500 bg-yellow-500/20 pointer-events-none"
                        style={{
                          left: `${(cropX / originalDimensions.width) * 100}%`,
                          top: `${(cropY / originalDimensions.height) * 100}%`,
                          width: `${(cropWidth / originalDimensions.width) * 100}%`,
                          height: `${(cropHeight / originalDimensions.height) * 100}%`,
                        }}
                      />
                    )}
                  </>
                ) : (
                  <div className="text-center text-gray-400 py-12">
                    <div className="text-4xl mb-2">🖼️</div>
                    <p className="text-sm">No image loaded</p>
                  </div>
                )}
              </div>
              {cropMode && cropArea.width > 0 && (
                <div className="mt-3 flex gap-2">
                  <button
                    onClick={applyCrop}
                    className="flex-1 py-2 bg-purple-500 text-white rounded-lg text-sm"
                  >
                    Apply Crop
                  </button>
                  <button
                    onClick={() => setCropMode(false)}
                    className="flex-1 py-2 bg-white/10 text-gray-300 rounded-lg text-sm"
                  >
                    Cancel
                  </button>
                </div>
              )}
            </div>

            {/* Converted Image */}
            <div className="backdrop-blur-xl bg-black/40 rounded-2xl border border-white/10 p-4">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-white font-semibold text-sm">
                  Converted ({selectedFormat})
                </h3>
                {convertedDimensions.width > 0 && (
                  <span className="text-xs text-purple-400 bg-purple-500/20 px-2 py-1 rounded-full">
                    {convertedDimensions.width}×{convertedDimensions.height}
                  </span>
                )}
              </div>
              <div className="rounded-xl overflow-hidden bg-black/50 flex items-center justify-center min-h-[300px]">
                {isConverting ? (
                  <div className="text-center">
                    <div className="animate-spin text-3xl mb-2">⚡</div>
                    <p className="text-purple-400 text-sm">Processing...</p>
                  </div>
                ) : convertedPreview ? (
                  <img
                    src={convertedPreview}
                    alt="Converted"
                    className="max-w-full max-h-[350px] object-contain"
                  />
                ) : (
                  <div className="text-center text-gray-400 py-12">
                    <div className="text-4xl mb-2">✨</div>
                    <p className="text-sm">Click Convert to see result</p>
                  </div>
                )}
              </div>
              {convertedPreview && (
                <div className="mt-3 flex justify-center gap-2 text-xs">
                  <span className="text-green-400">✓ Ready</span>
                  <span className="text-gray-400">• {selectedFormat}</span>
                  {(selectedFormat === "JPEG" || selectedFormat === "WebP") && (
                    <span className="text-gray-400">• {quality}% quality</span>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Dimension Comparison */}
          {originalPreview && convertedPreview && (
            <div className="mt-6 backdrop-blur-xl bg-black/40 rounded-2xl border border-white/10 p-4">
              <div className="flex items-center justify-center gap-4 text-sm">
                <span className="text-gray-400">
                  {originalDimensions.width}×{originalDimensions.height}
                </span>
                <span className="text-purple-400">→</span>
                <span className="text-white font-semibold">
                  {convertedDimensions.width}×{convertedDimensions.height}
                </span>
                <span className="w-px h-4 bg-white/20"></span>
                <span className="text-purple-400">{selectedFormat}</span>
                {showEffects &&
                  (brightness !== 100 ||
                    contrast !== 100 ||
                    saturation !== 100) && (
                    <span className="text-pink-400 text-xs">✨ Enhanced</span>
                  )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

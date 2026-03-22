import React, { useState, useRef, useEffect } from "react";

export default function ImageConverter() {
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
  const [quality, setQuality] = useState(90);

  // Crop settings
  const [cropMode, setCropMode] = useState(false);
  const [cropArea, setCropArea] = useState({ x: 0, y: 0, width: 0, height: 0 });
  const imageRef = useRef(null);

  const formats = ["PNG", "JPEG", "WebP", "BMP", "TIFF"];

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
      setCropArea({ x: 0, y: 0, width: img.width, height: img.height });
    };
    img.src = objectUrl;
  };

  const convertImage = async () => {
    if (!originalPreview) return;

    setIsConverting(true);
    setError(null);

    try {
      console.log("Starting conversion with settings:", originalPreview);
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
                className="w-full py-12 rounded-xl border-2 border-dashed border-purple-500/50 hover:border-purple-500 transition-all group"
              >
                <div className="text-4xl mb-3 group-hover:scale-110 transition-transform">
                  📸
                </div>
                <p className="text-white font-semibold">
                  Drop image or click to upload
                </p>
                <p className="text-gray-400 text-sm mt-1">
                  Max 20MB • All formats supported
                </p>
              </button>
              {fileName && (
                <div className="mt-3 text-sm text-gray-300 flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  {fileName}
                </div>
              )}
            </div>

            {/* Format Selection */}
            <div className="space-y-3">
              <h3 className="text-white font-semibold flex items-center gap-2">
                <span className="w-1 h-4 bg-purple-500 rounded-full"></span>
                Output Format
              </h3>
              <div className="grid grid-cols-3 gap-2">
                {formats.map((format) => (
                  <button
                    key={format}
                    onClick={() => setSelectedFormat(format)}
                    className={`px-3 py-2 rounded-lg text-sm transition-all ${
                      selectedFormat === format
                        ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg shadow-purple-500/50"
                        : "bg-white/5 text-gray-300 hover:bg-white/10"
                    }`}
                  >
                    {format}
                  </button>
                ))}
              </div>
              {(selectedFormat === "JPEG" || selectedFormat === "WebP") && (
                <div className="mt-3">
                  <label className="text-sm text-gray-300">
                    Quality: {quality}%
                  </label>
                  <input
                    type="range"
                    min="1"
                    max="100"
                    value={quality}
                    onChange={(e) => setQuality(parseInt(e.target.value))}
                    className="w-full mt-1 accent-purple-500"
                  />
                </div>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 pt-4">
              <button
                onClick={convertImage}
                disabled={!originalPreview || isConverting}
                className="flex-1 py-3 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold hover:shadow-lg hover:shadow-purple-500/50 transition-all disabled:opacity-50"
              >
                {isConverting ? "Processing..." : "⚡ Convert"}
              </button>

              {convertedPreview && (
                <button
                  onClick={downloadImage}
                  className="flex-1 py-3 rounded-xl bg-white/10 text-white font-semibold hover:bg-white/20 transition-all"
                >
                  💾 Export
                </button>
              )}
            </div>
            <div className="flex gap-3 pt-4">
              {selectedFile && (
                <button
                  onClick={clearAll}
                  className="flex-1 py-3 rounded-xl bg-white/10 text-white font-semibold hover:bg-white/20 transition-all"
                >
                  �️ Clear All
                </button>
              )}
            </div>
            {error && (
              <div className="bg-red-500/20 border border-red-500 rounded-lg p-3 text-red-300 text-sm">
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
                <h3 className="text-white font-semibold">Original</h3>
                {originalDimensions.width > 0 && (
                  <span className="text-xs text-gray-400 bg-white/10 px-2 py-1 rounded-full">
                    {originalDimensions.width}×{originalDimensions.height}
                  </span>
                )}
              </div>
              <div
                className={`relative rounded-xl overflow-hidden bg-black/50 flex items-center justify-center min-h-[300px]`}
              >
                {originalPreview ? (
                  <>
                    <img
                      ref={imageRef}
                      src={originalPreview}
                      alt="Original"
                      className="max-w-full max-h-[350px] object-contain"
                    />
                    {cropMode && cropArea.width > 0 && (
                      <div
                        className="absolute border-2 border-purple-500 bg-purple-500/30 animate-pulse"
                        style={{
                          left: `${(cropArea.x / originalDimensions.width) * 100}%`,
                          top: `${(cropArea.y / originalDimensions.height) * 100}%`,
                          width: `${(cropArea.width / originalDimensions.width) * 100}%`,
                          height: `${(cropArea.height / originalDimensions.height) * 100}%`,
                        }}
                      />
                    )}
                  </>
                ) : (
                  <div className="text-center text-gray-400 py-12">
                    <div className="text-5xl mb-3">🖼️</div>
                    <p>No image loaded</p>
                  </div>
                )}
              </div>
            </div>

            {/* Converted Image */}
            <div className="backdrop-blur-xl bg-black/40 rounded-2xl border border-white/10 p-4">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-white font-semibold">Converted</h3>
                {convertedDimensions.width > 0 && (
                  <span className="text-xs text-purple-400 bg-purple-500/20 px-2 py-1 rounded-full">
                    {convertedDimensions.width}×{convertedDimensions.height}
                  </span>
                )}
              </div>
              <div className="rounded-xl overflow-hidden bg-black/50 flex items-center justify-center min-h-[300px]">
                {isConverting ? (
                  <div className="text-center">
                    <div className="animate-spin text-4xl mb-2">⚡</div>
                    <p className="text-purple-400">Processing...</p>
                  </div>
                ) : convertedPreview ? (
                  <img
                    src={convertedPreview}
                    alt="Converted"
                    className="max-w-full max-h-[350px] object-contain"
                  />
                ) : (
                  <div className="text-center text-gray-400 py-12">
                    <div className="text-5xl mb-3">✨</div>
                    <p>Click Convert to see result</p>
                  </div>
                )}
              </div>
              {convertedPreview && (
                <div className="mt-3 flex justify-center gap-2 text-xs">
                  <span className="text-green-400">✓ Ready to download</span>
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
              <div className="flex items-center justify-center gap-6 text-sm">
                <span className="text-gray-400">
                  {originalDimensions.width}×{originalDimensions.height}
                </span>
                <span className="text-purple-400">→</span>
                <span className="text-white font-semibold">
                  {convertedDimensions.width}×{convertedDimensions.height}
                </span>
                <span className="w-px h-4 bg-white/20"></span>
                <span className="text-purple-400">{selectedFormat}</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api"; 
import Navbar from "../components/Navbar";
import "../Style/scan.css"; 
import "../Style/Dashboard.css";

export default function ScanExpensePage() {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);   

  // ================= STATE VARIABLES =================
  const [image, setImage] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [loading, setLoading] = useState(false);
  const [scanned, setScanned] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  // Camera State
  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [stream, setStream] = useState(null);

  // Form Data
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [paymentType, setPaymentType] = useState("cash");

  const [existingCategories, setExistingCategories] = useState([]);

  // ================= 1. FETCH CATEGORIES =================
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await api.get("/category/list");
        setExistingCategories(res.data);
      } catch (err) {
        console.error("Error fetching categories:", err);
      }
    };
    fetchCategories();
  }, []);

  // ================= CAMERA LOGIC =================
  async function startCamera() {
    setIsCameraOpen(true);
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({ 
        video: { facingMode: "environment" } // Requests Rear Camera on Mobile
      });
      setStream(mediaStream);
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
      }
    } catch (err) {
      console.error("Camera access denied:", err);
      alert("Could not access camera. Please check permissions.");
      setIsCameraOpen(false);
    }
  }

  function capturePhoto() {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    
    if (video && canvas) {
      // Set canvas size to match video stream
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      
      // Draw video frame to canvas
      const context = canvas.getContext("2d");
      context.drawImage(video, 0, 0, canvas.width, canvas.height);
      
      // Convert to File object
      canvas.toBlob((blob) => {
        const file = new File([blob], "captured_receipt.jpg", { type: "image/jpeg" });
        handleFileSelect(file);
        stopCamera();
      }, "image/jpeg");
    }
  }

  function stopCamera() {
    if (stream) {
      stream.getTracks().forEach(track => track.stop()); // Turn off hardware
      setStream(null);
    }
    setIsCameraOpen(false);
  }

  // ================= FILE HANDLING =================
  function handleFileSelect(file) {
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      alert("Please upload an image file.");
      return;
    }
    setImage(file);
    setPreviewUrl(URL.createObjectURL(file));
    setScanned(false);
  }

  // Drag & Drop Handlers
  const onDragOver = (e) => { e.preventDefault(); setIsDragging(true); };
  const onDragLeave = () => setIsDragging(false);
  const onDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    handleFileSelect(e.dataTransfer.files[0]);
  };

  /* ================= 2. SCAN BILL ================= */
  async function scanBill() {
    if (!image) return alert("Please select an image first");
    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("bill", image);
      const res = await api.post("/expense/scan-bill", formData);
      setAmount(res.data.amount || "");
      setCategory(res.data.category || ""); 
      setScanned(true);
    } catch (err) {
      alert("Failed to scan bill.");
    } finally {
      setLoading(false);
    }
  }

  /* ================= 3. ADD EXPENSE ================= */
  async function addExpense() {
    if (!amount) return alert("Amount required");
    try {
      await api.post("/expense/add-smart", {
        amount: Number(amount),
        paymentType,
        categoryName: category 
      });
      navigate(-1); 
    } catch (err) {
      alert(err.response?.data || "Failed to add expense");
    }
  }

  return (
    <div>
      <Navbar />

      <div className="container">
        <h2 style={{ marginBottom: "1.5rem" }}>Scan Receipt</h2>

        {/* ========== CAMERA OVERLAY ========== */}
        {isCameraOpen && (
          <div className="camera-overlay">
            <div className="camera-container">
              <video ref={videoRef} autoPlay playsInline className="camera-feed"></video>
              <canvas ref={canvasRef} hidden></canvas>
              
              <div className="camera-controls">
                <button className="capture-btn" onClick={capturePhoto}></button>
                <button className="close-camera" onClick={stopCamera}>Cancel</button>
              </div>
            </div>
          </div>
        )}

        {/* ========== UPLOAD SECTION ========== */}
        {!isCameraOpen && (
          <div className="card" style={{ marginBottom: "2rem" }}>
            
            {!previewUrl && (
              <>
                <div 
                  className={`upload-area ${isDragging ? "dragging" : ""}`}
                  onDragOver={onDragOver}
                  onDragLeave={onDragLeave}
                  onDrop={onDrop}
                  style={{ padding: "2rem 1rem" }}
                >
                  <svg className="upload-icon" width="48" height="48" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
                  </svg>
                  <div className="upload-text">Drag & Drop Receipt Here</div>
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "15px", marginTop: "1.5rem" }}>
                  
                  {/* REAL CAMERA BUTTON */}
                  <button 
                    className="primary" 
                    onClick={startCamera}
                    style={{ display: "flex", flexDirection: "column", alignItems: "center", padding: "1rem", gap: "8px" }}
                  >
                    <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M6.827 6.175A2.31 2.31 0 015.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 00-1.134-.175 2.31 2.31 0 01-1.64-1.055l-.822-1.316a2.192 2.192 0 00-1.736-1.039 48.774 48.774 0 00-5.232 0 2.192 2.192 0 00-1.736 1.039l-.821 1.316z"></path><path strokeLinecap="round" strokeLinejoin="round" d="M16.5 12.75a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0zM18.75 10.5h.008v.008h-.008V10.5z"></path></svg>
                    Take Photo
                  </button>

                  <button 
                    className="primary" 
                    onClick={() => fileInputRef.current.click()}
                    style={{ display: "flex", flexDirection: "column", alignItems: "center", padding: "1rem", gap: "8px", backgroundColor: "#eef2ff", color: "#4f46e5", border: "1px solid #c7d2fe" }}
                  >
                    <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a2.25 2.25 0 002.25-2.25V6a2.25 2.25 0 00-2.25-2.25H3.75A2.25 2.25 0 001.5 6v12a2.25 2.25 0 002.25 2.25z"></path></svg>
                    Upload File
                  </button>

                </div>

                <input type="file" hidden ref={fileInputRef} accept="image/*" onChange={(e) => handleFileSelect(e.target.files[0])} />
              </>
            )}

            {previewUrl && (
              <div>
                <div className="preview-container">
                  <img src={previewUrl} alt="Receipt Preview" className="bill-preview" />
                  <button className="remove-btn" onClick={() => { setImage(null); setPreviewUrl(null); setScanned(false); }}>✕</button>
                </div>
                {!scanned && (
                  <button className="primary" onClick={scanBill} disabled={loading} style={{ width: "100%", display: "flex", justifyContent: "center" }}>
                      {loading ? <span className="loader-spinner"></span> : "Scan & Extract Data"}
                  </button>
                )}
              </div>
            )}
          </div>
        )}

        {/* ========== FORM SECTION ========== */}
        {scanned && (
          <div className="card">
            <h3>Confirm Details</h3>
            <div className="input-group" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "15px", marginBottom: "1rem" }}>
                <div>
                    <label style={{ fontSize: "0.85rem", color: "#6b7280" }}>Amount</label>
                    <input className="auth-input" type="number" value={amount} onChange={(e) => setAmount(e.target.value)} />
                </div>
                <div>
                    <label style={{ fontSize: "0.85rem", color: "#6b7280" }}>Payment</label>
                    <select className="auth-input" value={paymentType} onChange={(e) => setPaymentType(e.target.value)}>
                        <option value="cash">Cash</option>
                        <option value="online">Online</option>
                    </select>
                </div>
            </div>

            <div style={{ marginBottom: "1.5rem" }}>
              <label style={{ fontSize: "0.85rem", color: "#6b7280" }}>Category</label>
              <input className="auth-input" list="category-options" value={category} onChange={(e) => setCategory(e.target.value)} />
              <datalist id="category-options">
                {existingCategories.map((cat) => (
                  <option key={cat._id} value={cat.cat_name || cat.name} />
                ))}
              </datalist>
            </div>

            <div style={{ display: "flex", gap: "10px" }}>
                <button className="primary" onClick={addExpense} style={{ flex: 1 }}>Save</button>
                <button className="primary" onClick={() => navigate(-1)} style={{ flex: 1, background: "#e5e7eb", color: "#374151" }}>Cancel</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
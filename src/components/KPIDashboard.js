import React, { useState, useRef } from "react";

const KPIDashboard = () => {
  // Refs
  const dashboardRef = useRef(null);
  const metricsRef = useRef(null);

  // State'ler
  const [activeTab, setActiveTab] = useState("dashboard");
  const [loading, setLoading] = useState(false);
  const [showEmailModal, setShowEmailModal] = useState(false);

  // Veri state'leri
  const [employees] = useState([
    { name: "Abdul Samet Dolu", team: "İstanbul Müşteriler -4", segment: "BM", performance: 89.5 },
    { name: "Ayşe Ersoy", team: "İstanbul Müşteriler -4", segment: "BM", performance: 101.2 },
    { name: "Batuhan Boyraz", team: "İstanbul Müşteriler -3", segment: "BM", performance: 93.7 },
    { name: "Burcu Cebeci", team: "İstanbul Müşteriler -1", segment: "ÖM", performance: 95.8 },
    { name: "Duygu Maranci", team: "İstanbul Müşteriler -1", segment: "BM", performance: 87.4 },
    { name: "Ece Karaman", team: "İstanbul Müşteriler -3", segment: "BM", performance: 96.1 },
    { name: "Efe Acar", team: "İstanbul Müşteriler -2", segment: "BM", performance: 91.3 },
    { name: "Ekrem Güler", team: "İstanbul Müşteriler -1", segment: "ÖM", performance: 88.9 }
  ]);

  const [formData, setFormData] = useState({
    date: new Date().toISOString().split("T")[0],
    employee: "",
    calls: "",
    proposals: "",
    onlineVisits: "",
    physicalVisits: "",
    onLeave: false,
  });

  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [emailData, setEmailData] = useState({
    recipient: "",
    subject: "Dashboard Raporu",
    type: "",
  });

  // CSS Styles - Düzeltilmiş
  const styles = {
    container: {
      maxWidth: "1400px",
      margin: "0 auto",
      background: "white",
      minHeight: "100vh",
      boxShadow: "0 0 30px rgba(0, 0, 0, 0.3)",
    },
    header: {
      background: "linear-gradient(135deg, #8315b5, #5a0e7a)",
      color: "white",
      padding: "20px",
      textAlign: "center",
      borderBottom: "4px solid #8315b5",
    },
    headerTitle: {
      fontSize: "2.2rem",
      marginBottom: "5px",
      fontWeight: "600",
      textShadow: "0 2px 4px rgba(0, 0, 0, 0.3)",
      margin: "0",
    },
    headerSubtitle: {
      opacity: "0.9",
      fontSize: "1.1rem",
      fontWeight: "300",
      margin: "0",
    },
    navBar: {
      background: "#f8f9fa",
      padding: "0",
      display: "flex",
      boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
      flexWrap: "wrap",
      borderBottom: "1px solid #dee2e6",
    },
    navTab: {
      flex: "1",
      background: "#e9ecef",
      border: "none",
      padding: "15px 8px",
      cursor: "pointer",
      fontWeight: "600",
      color: "#495057",
      transition: "all 0.3s ease",
      borderBottom: "3px solid transparent",
      minWidth: "120px",
      fontSize: "13px",
    },
    navTabActive: {
      background: "white",
      color: "#8315b5",
      borderBottom: "3px solid #8315b5",
      boxShadow: "0 -2px 8px rgba(131, 21, 181, 0.2)",
    },
    content: {
      padding: "30px",
    },
    metricsGrid: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
      gap: "20px",
      marginBottom: "30px",
    },
    metricCard: {
      background: "linear-gradient(145deg, #fff, #f8f9fa)",
      borderRadius: "12px",
      padding: "25px",
      textAlign: "center",
      boxShadow: "0 4px 15px rgba(0, 0, 0, 0.1)",
      borderLeft: "4px solid #8315b5",
      transition: "all 0.3s ease",
    },
    metricValue: {
      fontSize: "2.5rem",
      fontWeight: "bold",
      color: "#8315b5",
      marginBottom: "10px",
      margin: "0 0 10px 0",
    },
    metricLabel: {
      color: "#6c757d",
      fontWeight: "600",
      fontSize: "0.9rem",
      marginBottom: "8px",
      margin: "0 0 8px 0",
    },
    formContainer: {
      background: "white",
      borderRadius: "12px",
      padding: "30px",
      boxShadow: "0 4px 15px rgba(0, 0, 0, 0.1)",
      marginBottom: "30px",
      border: "1px solid #e9ecef",
    },
    formGrid: {
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      gap: "25px",
    },
    formGroup: {
      marginBottom: "20px",
    },
    label: {
      display: "block",
      marginBottom: "8px",
      color: "#495057",
      fontWeight: "600",
      fontSize: "0.9rem",
    },
    formControl: {
      width: "100%",
      padding: "12px 15px",
      border: "2px solid #e9ecef",
      borderRadius: "8px",
      fontSize: "14px",
      transition: "all 0.3s ease",
      background: "white",
      boxSizing: "border-box",
    },
    autoField: {
      background: "#e8f5e8",
      border: "2px solid #28a745",
      color: "#155724",
      fontWeight: "600",
      padding: "12px 15px",
      borderRadius: "8px",
      fontSize: "14px",
    },
    btn: {
      background: "linear-gradient(145deg, #8315b5, #5a0e7a)",
      color: "white",
      border: "none",
      padding: "15px 30px",
      borderRadius: "8px",
      fontWeight: "600",
      cursor: "pointer",
      fontSize: "16px",
      transition: "all 0.3s ease",
      boxShadow: "0 4px 10px rgba(131, 21, 181, 0.3)",
      margin: "5px",
    },
    btnSuccess: {
      background: "linear-gradient(145deg, #28a745, #20c997)",
      boxShadow: "0 4px 10px rgba(40, 167, 69, 0.3)",
    },
    btnInfo: {
      background: "linear-gradient(145deg, #17a2b8, #138496)",
      boxShadow: "0 4px 10px rgba(23, 162, 184, 0.3)",
    },
    statusInfo: {
      padding: "15px",
      borderRadius: "8px",
      marginBottom: "20px",
      border: "1px solid",
      fontWeight: "bold",
    },
    statusSuccess: {
      background: "#d4edda",
      color: "#155724",
      borderColor: "#28a745",
    },
    exportButtons: {
      display: "flex",
      gap: "10px",
      marginBottom: "20px",
      flexWrap: "wrap",
    },
    flexBetween: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: "20px",
    },
    flexGap: {
      display: "flex",
      gap: "10px",
      marginTop: "20px",
    },
    sectionTitle: {
      margin: "0",
      color: "#8315b5",
    },
    modal: {
      position: "fixed",
      top: "0",
      left: "0",
      width: "100%",
      height: "100%",
      background: "rgba(0,0,0,0.5)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      zIndex: "1000",
    },
    modalContent: {
      background: "white",
      padding: "30px",
      borderRadius: "12px",
      width: "90%",
      maxWidth: "500px",
      boxShadow: "0 8px 25px rgba(0, 0, 0, 0.3)",
    },
  };

  // Event handlers
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));

    if (name === "employee") {
      const emp = employees.find((e) => e.name === value);
      setSelectedEmployee(emp || null);
    }
  };

  const handleSubmit = async () => {
    if (!formData.employee) {
      alert("❌ Lütfen çalışan seçin!");
      return;
    }

    try {
      setLoading(true);
      // Mock save operation
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setFormData({
        date: new Date().toISOString().split("T")[0],
        employee: "",
        calls: "",
        proposals: "",
        onlineVisits: "",
        physicalVisits: "",
        onLeave: false,
      });
      setSelectedEmployee(null);
      alert("✅ Veri başarıyla kaydedildi!");
    } catch (error) {
      alert("❌ Hata: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  const openEmailModal = () => {
    setShowEmailModal(true);
  };

  const sendEmail = () => {
    alert(`📧 Email gönderildi!\nAlıcı: ${emailData.recipient}\nKonu: ${emailData.subject}`);
    setShowEmailModal(false);
  };

  // Utility functions
  const MetricCard = ({ value, label }) => (
    <div style={styles.metricCard}>
      <div style={styles.metricValue}>{value}</div>
      <div style={styles.metricLabel}>{label}</div>
    </div>
  );

  const calculateMetrics = () => {
    return {
      avgCalls: "42.3",
      avgProposals: "4.8",
      avgOnline: "1.9",
      avgPhysical: "1.2",
      avgTotal: "3.1",
      activeCount: 25,
    };
  };

  // Render functions
  const renderDashboard = () => {
    const metrics = calculateMetrics();
    
    return (
      <div ref={dashboardRef}>
        <div style={styles.flexBetween}>
          <h2 style={styles.sectionTitle}>
            📊 Günlük Ortalamalar & Paylaşım
          </h2>
          <div style={styles.exportButtons}>
            <button style={{...styles.btn, ...styles.btnInfo}} onClick={openEmailModal}>
              📧 Email Gönder
            </button>
          </div>
        </div>

        <div style={{...styles.statusInfo, ...styles.statusSuccess}}>
          ✅ Demo modu aktif - Test verileri gösteriliyor
        </div>

        <div ref={metricsRef} style={styles.metricsGrid}>
          <MetricCard value={metrics.avgCalls} label="Genel Ort. Arama" />
          <MetricCard value={metrics.avgProposals} label="Genel Ort. Teklif" />
          <MetricCard value={metrics.avgOnline} label="Genel Ort. Online Ziyaret" />
          <MetricCard value={metrics.avgPhysical} label="Genel Ort. Fiziki Ziyaret" />
          <MetricCard value={metrics.avgTotal} label="Genel Ort. Toplam Ziyaret" />
          <MetricCard value={`${metrics.activeCount}/${employees.length}`} label="👥 Bugün Aktif" />
        </div>
      </div>
    );
  };

  const renderDataEntry = () => (
    <div style={styles.formContainer}>
      <h2 style={{...styles.sectionTitle, marginBottom: "20px"}}>
        📝 Tekli Veri Girişi
      </h2>

      <div style={styles.formGrid}>
        <div>
          <div style={styles.formGroup}>
            <label style={styles.label}>📅 Tarih</label>
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleInputChange}
              style={styles.formControl}
              disabled={loading}
            />
          </div>
          <div style={styles.formGroup}>
            <label style={styles.label}>👤 Çalışan Seçin</label>
            <select
              name="employee"
              value={formData.employee}
              onChange={handleInputChange}
              style={styles.formControl}
              disabled={loading}
            >
              <option value="">-- Çalışan Seçin --</option>
              {employees.map((emp) => (
                <option key={emp.name} value={emp.name}>
                  {emp.name}
                </option>
              ))}
            </select>
          </div>
          {selectedEmployee && (
            <>
              <div style={styles.formGroup}>
                <label style={styles.label}>🏢 Ekip</label>
                <div style={styles.autoField}>{selectedEmployee.team}</div>
              </div>
              <div style={styles.formGroup}>
                <label style={styles.label}>📋 Segment</label>
                <div style={styles.autoField}>{selectedEmployee.segment}</div>
              </div>
            </>
          )}
        </div>
        <div>
          <div style={styles.formGroup}>
            <label style={styles.label}>📞 Arama Sayısı</label>
            <input
              type="number"
              name="calls"
              value={formData.calls}
              onChange={handleInputChange}
              style={styles.formControl}
              placeholder="Hedef: 45"
              disabled={formData.onLeave || loading}
            />
          </div>
          <div style={styles.formGroup}>
            <label style={styles.label}>📄 Teklif Sayısı</label>
            <input
              type="number"
              name="proposals"
              value={formData.proposals}
              onChange={handleInputChange}
              style={styles.formControl}
              placeholder="Hedef: 5"
              disabled={formData.onLeave || loading}
            />
          </div>
          <div style={styles.formGroup}>
            <label style={styles.label}>💻 Online Ziyaret</label>
            <input
              type="number"
              name="onlineVisits"
              value={formData.onlineVisits}
              onChange={handleInputChange}
              style={styles.formControl}
              placeholder="Hedef: 2"
              disabled={formData.onLeave || loading}
            />
          </div>
          <div style={styles.formGroup}>
            <label style={styles.label}>🏃‍♂️ Fiziki Ziyaret</label>
            <input
              type="number"
              name="physicalVisits"
              value={formData.physicalVisits}
              onChange={handleInputChange}
              style={styles.formControl}
              placeholder="Hedef: 1"
              disabled={formData.onLeave || loading}
            />
          </div>
          <div style={styles.formGroup}>
            <label style={styles.label}>
              <input
                type="checkbox"
                name="onLeave"
                checked={formData.onLeave}
                onChange={handleInputChange}
                style={{marginRight: "8px"}}
                disabled={loading}
              />
              🏖️ İzinli/Hasta
            </label>
          </div>
        </div>
      </div>

      <div style={styles.flexGap}>
        <button
          onClick={handleSubmit}
          style={{...styles.btn, ...styles.btnSuccess, flex: "1"}}
          disabled={loading}
        >
          {loading ? "⏳ Kaydediyor..." : "💾 Kaydet"}
        </button>
      </div>
    </div>
  );

  const renderTabContent = () => {
    switch (activeTab) {
      case "dashboard":
        return renderDashboard();
      case "data-entry":
        return renderDataEntry();
      default:
        return renderDashboard();
    }
  };

  return (
    <div style={{
      fontFamily: '"Segoe UI", Tahoma, Geneva, Verdana, sans-serif',
      background: "linear-gradient(135deg, #8315b5, #5a0e7a)",
      minHeight: "100vh",
      color: "#333",
      lineHeight: "1.6",
    }}>
      <div style={styles.container}>
        <div style={styles.header}>
          <h1 style={styles.headerTitle}>
            📊 İstanbul Müşteriler KPI Dashboard
          </h1>
          <div style={styles.headerSubtitle}>
            {new Date().toLocaleDateString("tr-TR", {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
            })} - Demo Sürümü
          </div>
        </div>

        <nav style={styles.navBar}>
          {[
            { id: "dashboard", label: "📊 Dashboard" },
            { id: "data-entry", label: "📝 Veri Girişi" },
          ].map((tab) => (
            <button
              key={tab.id}
              style={{
                ...styles.navTab,
                ...(activeTab === tab.id ? styles.navTabActive : {}),
              }}
              onClick={() => setActiveTab(tab.id)}
            >
              {tab.label}
            </button>
          ))}
        </nav>

        <div style={styles.content}>{renderTabContent()}</div>
      </div>

      {/* Email Modal */}
      {showEmailModal && (
        <div style={styles.modal}>
          <div style={styles.modalContent}>
            <h3>📧 Email Gönder</h3>
            <div style={styles.formGroup}>
              <label style={styles.label}>👤 Alıcı Email</label>
              <input
                type="email"
                style={styles.formControl}
                placeholder="ornek@email.com"
                value={emailData.recipient}
                onChange={(e) =>
                  setEmailData((prev) => ({
                    ...prev,
                    recipient: e.target.value,
                  }))
                }
              />
            </div>
            <div style={styles.formGroup}>
              <label style={styles.label}>📝 Konu</label>
              <input
                type="text"
                style={styles.formControl}
                value={emailData.subject}
                onChange={(e) =>
                  setEmailData((prev) => ({ ...prev, subject: e.target.value }))
                }
              />
            </div>
            <div style={styles.flexGap}>
              <button style={{...styles.btn, ...styles.btnSuccess}} onClick={sendEmail}>
                📧 Gönder
              </button>
              <button style={styles.btn} onClick={() => setShowEmailModal(false)}>
                ❌ İptal
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default KPIDashboard;

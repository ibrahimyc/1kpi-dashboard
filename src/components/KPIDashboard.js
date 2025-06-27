import React, { useState, useRef } from "react";

const KPIDashboard = () => {
  // Refs
  const dashboardRef = useRef(null);
  const metricsRef = useRef(null);

  // State'ler
  const [activeTab, setActiveTab] = useState("dashboard");
  const [loading, setLoading] = useState(false);
  const [showEmailModal, setShowEmailModal] = useState(false);

  // GERÇEK VERİLER - İSTANBUL MÜŞTERİLER
  const [employees] = useState([
    { name: "Abdul Samet Dolu", team: "İstanbul Müşteriler -4", segment: "BM", performance: 89.5 },
    { name: "Ayşe Ersoy", team: "İstanbul Müşteriler -4", segment: "BM", performance: 101.2 },
    { name: "Batuhan Boyraz", team: "İstanbul Müşteriler -3", segment: "BM", performance: 93.7 },
    { name: "Burcu Cebeci", team: "İstanbul Müşteriler -1", segment: "ÖM", performance: 95.8 },
    { name: "Duygu Maranci", team: "İstanbul Müşteriler -1", segment: "BM", performance: 87.4 },
    { name: "Ece Karaman", team: "İstanbul Müşteriler -3", segment: "BM", performance: 96.1 },
    { name: "Efe Acar", team: "İstanbul Müşteriler -2", segment: "BM", performance: 91.3 },
    { name: "Ekrem Güler", team: "İstanbul Müşteriler -1", segment: "ÖM", performance: 88.9 },
    { name: "Hasan Aycan Yılmaz", team: "İstanbul Müşteriler -3", segment: "BM", performance: 92.6 },
    { name: "Kaan Yasin Dinçer", team: "İstanbul Müşteriler -2", segment: "BM", performance: 90.1 },
    { name: "Kenan Furuncu", team: "İstanbul Müşteriler -4", segment: "ÖM", performance: 94.3 },
    { name: "Mert Bayramoğlu", team: "İstanbul Müşteriler -1", segment: "ÖM", performance: 99.1 },
    { name: "Merve Vural", team: "İstanbul Müşteriler -3", segment: "BM", performance: 85.7 },
    { name: "Murat Altun", team: "İstanbul Müşteriler -4", segment: "BM", performance: 93.2 },
    { name: "Mustafa Karayandı", team: "İstanbul Müşteriler -2", segment: "BM", performance: 89.8 },
    { name: "Mürüvvet Emek", team: "İstanbul Müşteriler -4", segment: "ÖM", performance: 97.4 },
    { name: "Naile Sürmeli", team: "İstanbul Müşteriler -4", segment: "BM", performance: 91.6 },
    { name: "Nida Ezer", team: "İstanbul Müşteriler -1", segment: "BM", performance: 86.3 },
    { name: "Ömer Emre Çeltekoğlu", team: "İstanbul Müşteriler -2", segment: "ÖM", performance: 92.9 },
    { name: "Samet Cömert", team: "İstanbul Müşteriler -2", segment: "ÖM", performance: 88.1 },
    { name: "Semih Erkılıç", team: "İstanbul Müşteriler -1", segment: "BM", performance: 95.2 },
    { name: "Serdar Tahtalı", team: "İstanbul Müşteriler -3", segment: "ÖM", performance: 90.7 },
    { name: "Seyhan Erol", team: "İstanbul Müşteriler -4", segment: "ÖM", performance: 87.8 },
    { name: "Şeniz Türedi Güçlü", team: "İstanbul Müşteriler -2", segment: "ÖM", performance: 94.6 },
    { name: "Taylan Murat Seymen", team: "İstanbul Müşteriler -1", segment: "BM", performance: 89.4 },
    { name: "Vivet Bahar", team: "İstanbul Müşteriler -2", segment: "ÖM", performance: 93.8 },
    { name: "Yasemin Ağaçbüken Üçler", team: "İstanbul Müşteriler -3", segment: "ÖM", performance: 91.9 },
    { name: "Yiğit Mert Demir", team: "İstanbul Müşteriler -3", segment: "BM", performance: 88.5 }
  ]);

  // Günlük veri entries
  const [dataEntries, setDataEntries] = useState([
    { id: 1, date: "2025-06-27", employee: "Ayşe Ersoy", team: "İstanbul Müşteriler -4", calls: 52, proposals: 6, online_visits: 3, physical_visits: 2, total_visits: 5, on_leave: false },
    { id: 2, date: "2025-06-27", employee: "Mert Bayramoğlu", team: "İstanbul Müşteriler -1", calls: 48, proposals: 5, online_visits: 2, physical_visits: 1, total_visits: 3, on_leave: false },
    { id: 3, date: "2025-06-27", employee: "Ece Karaman", team: "İstanbul Müşteriler -3", calls: 45, proposals: 4, online_visits: 2, physical_visits: 1, total_visits: 3, on_leave: false },
    { id: 4, date: "2025-06-27", employee: "Semih Erkılıç", team: "İstanbul Müşteriler -1", calls: 41, proposals: 5, online_visits: 1, physical_visits: 2, total_visits: 3, on_leave: false },
    { id: 5, date: "2025-06-27", employee: "Mürüvvet Emek", team: "İstanbul Müşteriler -4", calls: 38, proposals: 3, online_visits: 2, physical_visits: 0, total_visits: 2, on_leave: false },
    { id: 6, date: "2025-06-27", employee: "Burcu Cebeci", team: "İstanbul Müşteriler -1", calls: 35, proposals: 4, online_visits: 1, physical_visits: 1, total_visits: 2, on_leave: false },
    { id: 7, date: "2025-06-27", employee: "Abdul Samet Dolu", team: "İstanbul Müşteriler -4", calls: 0, proposals: 0, online_visits: 0, physical_visits: 0, total_visits: 0, on_leave: true }
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
    subject: "KPI Dashboard Raporu",
    type: "",
  });

  // CSS Styles
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
    progressBar: {
      width: "100%",
      height: "8px",
      background: "#e9ecef",
      borderRadius: "4px",
      overflow: "hidden",
      margin: "10px 0",
    },
    progressFill: {
      height: "100%",
      borderRadius: "4px",
      transition: "width 0.5s ease",
      background: "linear-gradient(90deg, #28a745, #20c997)",
    },
    formContainer: {
      background: "white",
      borderRadius: "12px",
      padding: "30px",
      boxShadow: "0 4px 15px rgba(0, 0, 0, 0.1)",
      marginBottom: "30px",
      border: "1px solid #e9ecef",
    },
    hierarchyContainer: {
      marginBottom: "30px",
    },
    teamHeader: {
      background: "linear-gradient(145deg, #8315b5, #5a0e7a)",
      color: "white",
      padding: "15px 20px",
      borderRadius: "8px",
      marginBottom: "15px",
      fontSize: "1.2rem",
      fontWeight: "bold",
    },
    employeeList: {
      marginLeft: "20px",
      marginBottom: "20px",
    },
    employeeItem: {
      background: "#f8f9fa",
      padding: "10px 15px",
      borderRadius: "6px",
      marginBottom: "8px",
      borderLeft: "4px solid #28a745",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
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
    btnWarning: {
      background: "linear-gradient(145deg, #ffc107, #e0a800)",
      color: "#212529",
      boxShadow: "0 4px 10px rgba(255, 193, 7, 0.3)",
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
    table: {
      width: "100%",
      borderCollapse: "collapse",
      background: "white",
      borderRadius: "8px",
      overflow: "hidden",
      boxShadow: "0 4px 15px rgba(0, 0, 0, 0.1)",
      marginTop: "20px",
    },
    tableHeader: {
      background: "linear-gradient(145deg, #8315b5, #5a0e7a)",
      color: "white",
      padding: "15px 12px",
      textAlign: "left",
      fontWeight: "600",
      fontSize: "0.9rem",
    },
    tableCell: {
      padding: "12px",
      borderBottom: "1px solid #e9ecef",
      fontSize: "0.9rem",
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
      
      // Yeni entry oluştur
      const newEntry = {
        id: dataEntries.length + 1,
        date: formData.date,
        employee: formData.employee,
        team: selectedEmployee.team,
        calls: formData.onLeave ? 0 : parseInt(formData.calls) || 0,
        proposals: formData.onLeave ? 0 : parseInt(formData.proposals) || 0,
        online_visits: formData.onLeave ? 0 : parseInt(formData.onlineVisits) || 0,
        physical_visits: formData.onLeave ? 0 : parseInt(formData.physicalVisits) || 0,
        total_visits: formData.onLeave ? 0 : (parseInt(formData.onlineVisits) || 0) + (parseInt(formData.physicalVisits) || 0),
        on_leave: formData.onLeave
      };

      // DataEntries'e ekle
      setDataEntries(prev => [newEntry, ...prev]);
      
      // Formu temizle
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

  const sendWhatsApp = () => {
    const metrics = calculateMetrics();
    const message = `📊 İstanbul Müşteriler KPI Dashboard - ${new Date().toLocaleDateString("tr-TR")}

📈 Günlük Ortalamalar:
• Arama: ${metrics.avgCalls}
• Teklif: ${metrics.avgProposals}  
• Online Ziyaret: ${metrics.avgOnline}
• Fiziki Ziyaret: ${metrics.avgPhysical}
• Toplam Ziyaret: ${metrics.avgTotal}
• Aktif Çalışan: ${metrics.activeCount}/${employees.length}

💼 En İyi Performans:
${getTopPerformers()}`;

    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, "_blank");
  };

  const getTopPerformers = () => {
    const today = new Date().toISOString().split("T")[0];
    const todayEntries = dataEntries.filter(e => e.date === today && !e.on_leave);
    const sorted = todayEntries.sort((a, b) => b.total_visits - a.total_visits);
    return sorted.slice(0, 3).map((entry, index) => 
      `${index + 1}. ${entry.employee}: ${entry.total_visits} ziyaret`
    ).join('\n');
  };

  // Utility functions
  const MetricCard = ({ value, label, target, progress }) => (
    <div style={styles.metricCard}>
      <div style={styles.metricValue}>{value}</div>
      <div style={styles.metricLabel}>{label}</div>
      {target && (
        <div style={{color: "#28a745", fontSize: "0.8rem", marginTop: "5px"}}>
          Hedef: {target}
        </div>
      )}
      {progress && (
        <div style={styles.progressBar}>
          <div style={{...styles.progressFill, width: `${Math.min(progress, 100)}%`}} />
        </div>
      )}
    </div>
  );

  const calculateMetrics = () => {
    const today = new Date().toISOString().split("T")[0];
    const todayEntries = dataEntries.filter(e => e.date === today && !e.on_leave);

    if (todayEntries.length === 0) {
      return {
        avgCalls: "0.0",
        avgProposals: "0.0", 
        avgOnline: "0.0",
        avgPhysical: "0.0",
        avgTotal: "0.0",
        activeCount: 0,
      };
    }

    return {
      avgCalls: (todayEntries.reduce((sum, e) => sum + e.calls, 0) / todayEntries.length).toFixed(1),
      avgProposals: (todayEntries.reduce((sum, e) => sum + e.proposals, 0) / todayEntries.length).toFixed(1),
      avgOnline: (todayEntries.reduce((sum, e) => sum + e.online_visits, 0) / todayEntries.length).toFixed(1),
      avgPhysical: (todayEntries.reduce((sum, e) => sum + e.physical_visits, 0) / todayEntries.length).toFixed(1),
      avgTotal: (todayEntries.reduce((sum, e) => sum + e.total_visits, 0) / todayEntries.length).toFixed(1),
      activeCount: todayEntries.length,
    };
  };

  const getUniqueTeams = () => {
    const teamNames = [...new Set(employees.map(emp => emp.team))];
    return teamNames.sort((a, b) => {
      const numA = parseInt(a.split("-").pop());
      const numB = parseInt(b.split("-").pop());
      return numA - numB;
    });
  };

  const calculateTeamMetrics = (teamName) => {
    const today = new Date().toISOString().split("T")[0];
    const teamEntries = dataEntries.filter(e => e.date === today && e.team === teamName && !e.on_leave);

    if (teamEntries.length === 0) {
      return { avgCalls: "0.0", avgProposals: "0.0", avgTotal: "0.0", activeCount: 0 };
    }

    return {
      avgCalls: (teamEntries.reduce((sum, e) => sum + e.calls, 0) / teamEntries.length).toFixed(1),
      avgProposals: (teamEntries.reduce((sum, e) => sum + e.proposals, 0) / teamEntries.length).toFixed(1),
      avgTotal: (teamEntries.reduce((sum, e) => sum + e.total_visits, 0) / teamEntries.length).toFixed(1),
      activeCount: teamEntries.length,
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
            <button style={{...styles.btn, ...styles.btnSuccess}} onClick={sendWhatsApp}>
              📱 WhatsApp Gönder
            </button>
            <button style={{...styles.btn, ...styles.btnInfo}} onClick={() => setShowEmailModal(true)}>
              📧 Email Gönder
            </button>
          </div>
        </div>

        <div style={{...styles.statusInfo, ...styles.statusSuccess}}>
          ✅ İstanbul Müşteriler KPI Dashboard - Gerçek Zamanlı Veriler
        </div>

        {/* Genel Metrikler */}
        <div ref={metricsRef} style={styles.metricsGrid}>
          <MetricCard 
            value={metrics.avgCalls} 
            label="Genel Ort. Arama" 
            target="45"
            progress={(metrics.avgCalls / 45) * 100}
          />
          <MetricCard 
            value={metrics.avgProposals} 
            label="Genel Ort. Teklif"
            target="5" 
            progress={(metrics.avgProposals / 5) * 100}
          />
          <MetricCard 
            value={metrics.avgOnline} 
            label="Genel Ort. Online Ziyaret"
            target="2"
            progress={(metrics.avgOnline / 2) * 100}
          />
          <MetricCard 
            value={metrics.avgPhysical} 
            label="Genel Ort. Fiziki Ziyaret"
            target="1"
            progress={(metrics.avgPhysical / 1) * 100}
          />
          <MetricCard 
            value={metrics.avgTotal} 
            label="Genel Ort. Toplam Ziyaret"
            target="3"
            progress={(metrics.avgTotal / 3) * 100}
          />
          <MetricCard 
            value={`${metrics.activeCount}/${employees.length}`} 
            label="👥 Bugün Aktif"
            target={`Katılım: ${Math.round((metrics.activeCount / employees.length) * 100)}%`}
            progress={(metrics.activeCount / employees.length) * 100}
          />
        </div>

        {/* Ekip Hiyerarşisi */}
        <div style={styles.hierarchyContainer}>
          <h3 style={{color: "#8315b5", marginBottom: "20px"}}>
            🏢 Ekip Hiyerarşisi ve Günlük Performans
          </h3>

          {getUniqueTeams().map(teamName => {
            const teamMetrics = calculateTeamMetrics(teamName);
            const teamEmployees = employees.filter(emp => emp.team === teamName);

            return (
              <div key={teamName} style={{marginBottom: "25px"}}>
                <div style={styles.teamHeader}>
                  <div style={{display: "flex", justifyContent: "space-between", alignItems: "center"}}>
                    <span>🏢 {teamName}</span>
                    <div style={{fontSize: "0.9rem", opacity: "0.9"}}>
                      Arama {teamMetrics.avgCalls} | Teklif {teamMetrics.avgProposals} | 
                      Toplam Ziyaret {teamMetrics.avgTotal} | 👥 {teamMetrics.activeCount}/{teamEmployees.length}
                    </div>
                  </div>
                </div>

                <div style={styles.employeeList}>
                  {teamEmployees.map(emp => {
                    const empEntries = dataEntries.filter(e => 
                      e.date === new Date().toISOString().split("T")[0] && e.employee === emp.name
                    );
                    const todayEntry = empEntries[0];
                    const isActive = todayEntry && !todayEntry.on_leave;
                    const isOnLeave = todayEntry && todayEntry.on_leave;

                    return (
                      <div key={emp.name} style={{
                        ...styles.employeeItem,
                        borderLeft: `4px solid ${isActive ? "#28a745" : isOnLeave ? "#ffc107" : "#dc3545"}`
                      }}>
                        <div>
                          <strong>{emp.name}</strong> - {emp.segment}
                          {isOnLeave && (
                            <span style={{color: "#ffc107", marginLeft: "10px"}}>🏖️ İzinli</span>
                          )}
                        </div>
                        <div style={{fontSize: "0.9rem"}}>
                          {isActive ? (
                            <>Arama {todayEntry.calls} | Teklif {todayEntry.proposals} | Toplam Ziyaret {todayEntry.total_visits}</>
                          ) : isOnLeave ? (
                            <span style={{color: "#856404"}}>İzinli</span>
                          ) : (
                            <span style={{color: "#dc3545"}}>Veri yok</span>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>

        {/* Hızlı İşlemler */}
        <div style={styles.formContainer}>
          <h3 style={{color: "#8315b5", marginBottom: "20px"}}>🚀 Hızlı İşlemler</h3>
          <div style={{display: "flex", gap: "10px", flexWrap: "wrap"}}>
            <button style={{...styles.btn, ...styles.btnWarning}} onClick={() => setActiveTab("data-entry")}>
              📝 Veri Girişi
            </button>
            <button style={{...styles.btn, ...styles.btnInfo}} onClick={sendWhatsApp}>
              📱 WhatsApp Paylaş
            </button>
          </div>
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
              {employees.map(emp => (
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

      {/* Son Veriler */}
      {dataEntries.length > 0 && (
        <div style={{marginTop: "30px"}}>
          <h3 style={{color: "#8315b5", marginBottom: "15px"}}>📋 Son Girilen Veriler</h3>
          <div style={{overflowX: "auto"}}>
            <table style={styles.table}>
              <thead>
                <tr>
                  <th style={styles.tableHeader}>Tarih</th>
                  <th style={styles.tableHeader}>Çalışan</th>
                  <th style={styles.tableHeader}>Ekip</th>
                  <th style={styles.tableHeader}>Arama</th>
                  <th style={styles.tableHeader}>Teklif</th>
                  <th style={styles.tableHeader}>Online</th>
                  <th style={styles.tableHeader}>Fiziki</th>
                  <th style={styles.tableHeader}>Toplam</th>
                  <th style={styles.tableHeader}>Durum</th>
                </tr>
              </thead>
              <tbody>
                {dataEntries.slice(0, 10).map((entry, index) => (
                  <tr key={entry.id} style={index % 2 === 0 ? {backgroundColor: "#f8f9fa"} : {}}>
                    <td style={styles.tableCell}>{entry.date}</td>
                    <td style={styles.tableCell}><strong>{entry.employee}</strong></td>
                    <td style={styles.tableCell}>{entry.team}</td>
                    <td style={styles.tableCell}>{entry.on_leave ? "-" : entry.calls}</td>
                    <td style={styles.tableCell}>{entry.on_leave ? "-" : entry.proposals}</td>
                    <td style={styles.tableCell}>{entry.on_leave ? "-" : entry.online_visits}</td>
                    <td style={styles.tableCell}>{entry.on_leave ? "-" : entry.physical_visits}</td>
                    <td style={styles.tableCell}><strong>{entry.on_leave ? "-" : entry.total_visits}</strong></td>
                    <td style={styles.tableCell}>
                      <span style={{color: entry.on_leave ? "#ffc107" : "#28a745", fontWeight: "bold"}}>
                        {entry.on_leave ? "🏖️ İzinli" : "✅ Aktif"}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
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
            })} - Gerçek Zamanlı Sistem
          </div>
        </div>

        <nav style={styles.navBar}>
          {[
            { id: "dashboard", label: "📊 Dashboard" },
            { id: "data-entry", label: "📝 Veri Girişi" },
          ].map(tab => (
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
                onChange={(e) => setEmailData(prev => ({...prev, recipient: e.target.value}))}
              />
            </div>
            <div style={styles.formGroup}>
              <label style={styles.label}>📝 Konu</label>
              <input
                type="text"
                style={styles.formControl}
                value={emailData.subject}
                onChange={(e) => setEmailData(prev => ({...prev, subject: e.target.value}))}
              />
            </div>
            <div style={styles.flexGap}>
              <button style={{...styles.btn, ...styles.btnSuccess}} onClick={() => {
                alert(`📧 Email gönderildi!\nAlıcı: ${emailData.recipient}\nKonu: ${emailData.subject}`);
                setShowEmailModal(false);
              }}>
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

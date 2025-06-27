import React, { useState, useEffect, useRef } from "react";
import { createClient } from "@supabase/supabase-js";

// Environment variables'dan Supabase konfigürasyonu
const supabaseUrl = process.env.REACT_APP_SUPABASE_URL || "https://wdmegcukhdmribetwxfg.supabase.co";
const supabaseKey = process.env.REACT_APP_SUPABASE_ANON_KEY || 
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndkbWVnY3VraGRtcmliZXR3eGZnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTA4MzUzNTQsImV4cCI6MjA2NjQxMTM1NH0.OkMsqpwcSPYiPd8EZ4x2-hREhXGttR2h5Nvoon0d8so";

const supabase = createClient(supabaseUrl, supabaseKey);

const KPIDashboard = () => {
  // Dashboard referansı (screenshot için)
  const dashboardRef = useRef(null);

  // Ana state'ler
  const [activeTab, setActiveTab] = useState("dashboard");
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  // Veri state'leri
  const [employees, setEmployees] = useState([
    {
      name: "Abdul Samet Dolu",
      team: "İstanbul Müşteriler -4",
      segment: "BM",
      performance: 89.5,
    },
    {
      name: "Ayşe Ersoy",
      team: "İstanbul Müşteriler -4",
      segment: "BM",
      performance: 101.2,
    },
    {
      name: "Batuhan Boyraz",
      team: "İstanbul Müşteriler -3",
      segment: "BM",
      performance: 93.7,
    },
    {
      name: "Burcu Cebeci",
      team: "İstanbul Müşteriler -1",
      segment: "ÖM",
      performance: 95.8,
    },
    {
      name: "Duygu Maranci",
      team: "İstanbul Müşteriler -1",
      segment: "BM",
      performance: 87.4,
    },
    {
      name: "Ece Karaman",
      team: "İstanbul Müşteriler -3",
      segment: "BM",
      performance: 96.1,
    },
    {
      name: "Efe Acar",
      team: "İstanbul Müşteriler -2",
      segment: "BM",
      performance: 91.3,
    },
    {
      name: "Ekrem Güler",
      team: "İstanbul Müşteriler -1",
      segment: "ÖM",
      performance: 88.9,
    },
    {
      name: "Hasan Aycan Yılmaz",
      team: "İstanbul Müşteriler -3",
      segment: "BM",
      performance: 92.6,
    },
    {
      name: "Kaan Yasin Dinçer",
      team: "İstanbul Müşteriler -2",
      segment: "BM",
      performance: 90.1,
    },
    {
      name: "Kenan Furuncu",
      team: "İstanbul Müşteriler -4",
      segment: "ÖM",
      performance: 94.3,
    },
    {
      name: "Mert Bayramoğlu",
      team: "İstanbul Müşteriler -1",
      segment: "ÖM",
      performance: 99.1,
    },
    {
      name: "Merve Vural",
      team: "İstanbul Müşteriler -3",
      segment: "BM",
      performance: 85.7,
    },
    {
      name: "Murat Altun",
      team: "İstanbul Müşteriler -4",
      segment: "BM",
      performance: 93.2,
    },
    {
      name: "Mustafa Karayandı",
      team: "İstanbul Müşteriler -2",
      segment: "BM",
      performance: 89.8,
    },
    {
      name: "Mürüvvet Emek",
      team: "İstanbul Müşteriler -4",
      segment: "ÖM",
      performance: 97.4,
    },
    {
      name: "Naile Sürmeli",
      team: "İstanbul Müşteriler -4",
      segment: "BM",
      performance: 91.6,
    },
    {
      name: "Nida Ezer",
      team: "İstanbul Müşteriler -1",
      segment: "BM",
      performance: 86.3,
    },
    {
      name: "Ömer Emre Çeltekoğlu",
      team: "İstanbul Müşteriler -2",
      segment: "ÖM",
      performance: 92.9,
    },
    {
      name: "Samet Cömert",
      team: "İstanbul Müşteriler -2",
      segment: "ÖM",
      performance: 88.1,
    },
    {
      name: "Semih Erkılıç",
      team: "İstanbul Müşteriler -1",
      segment: "BM",
      performance: 95.2,
    },
    {
      name: "Serdar Tahtalı",
      team: "İstanbul Müşteriler -3",
      segment: "ÖM",
      performance: 90.7,
    },
    {
      name: "Seyhan Erol",
      team: "İstanbul Müşteriler -4",
      segment: "ÖM",
      performance: 87.8,
    },
    {
      name: "Şeniz Türedi Güçlü",
      team: "İstanbul Müşteriler -2",
      segment: "ÖM",
      performance: 94.6,
    },
    {
      name: "Taylan Murat Seymen",
      team: "İstanbul Müşteriler -1",
      segment: "BM",
      performance: 89.4,
    },
    {
      name: "Vivet Bahar",
      team: "İstanbul Müşteriler -2",
      segment: "ÖM",
      performance: 93.8,
    },
    {
      name: "Yasemin Ağaçbüken Üçler",
      team: "İstanbul Müşteriler -3",
      segment: "ÖM",
      performance: 91.9,
    },
    {
      name: "Yiğit Mert Demir",
      team: "İstanbul Müşteriler -3",
      segment: "BM",
      performance: 88.5,
    },
  ]);

  const [dataEntries, setDataEntries] = useState([]);
  const [teams, setTeams] = useState([
    { name: "İstanbul Müşteriler -1", password: "team1", created_at: new Date().toISOString() },
    { name: "İstanbul Müşteriler -2", password: "team2", created_at: new Date().toISOString() },
    { name: "İstanbul Müşteriler -3", password: "team3", created_at: new Date().toISOString() },
    { name: "İstanbul Müşteriler -4", password: "team4", created_at: new Date().toISOString() },
  ]);
  const [kpiTargets, setKpiTargets] = useState({
    calls: 45,
    proposals: 5,
    online_visits: 2,
    physical_visits: 1,
    total_visits: 3,
  });
  const [adminSettings, setAdminSettings] = useState({
    admin_password: "1234"
  });

  // Form state'leri
  const [formData, setFormData] = useState({
    date: new Date().toISOString().split("T")[0],
    employee: "",
    calls: "",
    proposals: "",
    onlineVisits: "",
    physicalVisits: "",
    onLeave: false,
  });

  const [bulkFormData, setBulkFormData] = useState({
    date: new Date().toISOString().split("T")[0],
    team: "",
    employees: [],
  });

  const [selectedEmployee, setSelectedEmployee] = useState(null);

  // Modal state'leri
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [showBulkModal, setShowBulkModal] = useState(false);
  const [showBulkPasswordModal, setShowBulkPasswordModal] = useState(false);
  const [showEmailModal, setShowEmailModal] = useState(false);
  const [deleteType, setDeleteType] = useState("");
  const [deleteTarget, setDeleteTarget] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  const [oldPasswordInput, setOldPasswordInput] = useState("");
  const [newPasswordInput, setNewPasswordInput] = useState("");
  const [passwordAction, setPasswordAction] = useState("");
  const [emailData, setEmailData] = useState({
    recipient: "",
    subject: "",
    type: "",
  });

  // Admin form state'leri
  const [adminFormData, setAdminFormData] = useState({
    newEmployee: { name: "", team: "", segment: "BM" },
    kpiUpdates: {},
    passwordUpdates: {},
  });

  // Sayfa yüklendiğinde
  useEffect(() => {
    loadAllData();
  }, []);

  // Tüm verileri yükle
  const loadAllData = async () => {
    await Promise.all([
      loadDataFromSupabase(),
      loadTeams(),
      loadKpiTargets(),
      loadAdminSettings(),
    ]);
    setTimeout(() => updateEmployeePerformances(), 500);
  };

  // Verileri yenile (manuel)
  const refreshData = async () => {
    setRefreshing(true);
    await loadAllData();
    updateEmployeePerformances();
    setRefreshing(false);
    alert("✅ Veriler yenilendi!");
  };

  // Çalışan performanslarını güncelle
  const updateEmployeePerformances = () => {
    const currentMonth = new Date().toISOString().slice(0, 7);
    const monthlyEntries = dataEntries.filter(
      (e) => e.date.startsWith(currentMonth) && !e.on_leave
    );

    setEmployees((prevEmployees) =>
      prevEmployees.map((emp) => {
        const empEntries = monthlyEntries.filter(
          (e) => e.employee === emp.name
        );
        if (empEntries.length === 0) return { ...emp, performance: 85.0 };

        const avgCalls =
          empEntries.reduce((sum, e) => sum + (e.calls || 0), 0) /
          empEntries.length;
        const avgProposals =
          empEntries.reduce((sum, e) => sum + (e.proposals || 0), 0) /
          empEntries.length;
        const avgVisits =
          empEntries.reduce((sum, e) => sum + (e.total_visits || 0), 0) /
          empEntries.length;

        const performance =
          ((avgCalls / (kpiTargets.calls || 45)) * 40 +
            (avgProposals / (kpiTargets.proposals || 5)) * 30 +
            (avgVisits / (kpiTargets.total_visits || 3)) * 30) *
          100;

        return { ...emp, performance: Math.min(performance, 150) };
      })
    );
  };

  // Export to Excel function
  const exportToExcel = (data, filename) => {
    const csvContent =
      "data:text/csv;charset=utf-8," +
      Object.keys(data[0]).join(",") +
      "\n" +
      data.map((row) => Object.values(row).join(",")).join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute(
      "download",
      filename + "_" + new Date().toISOString().split("T")[0] + ".csv"
    );
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Screenshot and Email functions
  const takeScreenshot = async () => {
    if (!dashboardRef.current) return null;

    try {
      // Bu basit bir simulasyon - gerçek uygulamada html2canvas kullanılır
      return "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChwGA60e6kgAAAABJRU5ErkJggg==";
    } catch (error) {
      console.error("Screenshot alma hatası:", error);
      return null;
    }
  };

  const sendEmail = async (type, data = null) => {
    setShowEmailModal(false);

    // Gerçek uygulamada email servis API'si kullanılır
    const emailContent =
      type === "screenshot"
        ? "Dashboard ekran görüntüsü ekte yer almaktadır."
        : "Rapor dosyası ekte yer almaktadır.";

    // Simülasyon
    alert(
      "📧 Email gönderildi!\nAlıcı: " + emailData.recipient + "\nKonu: " + emailData.subject + "\nİçerik: " + emailContent
    );
  };

  const sendWhatsApp = async () => {
    const screenshot = await takeScreenshot();
    const currentMetrics = calculateMetrics();

    // WhatsApp mesaj içeriği
    const message = "📊 İstanbul Müşteriler KPI Dashboard - " + new Date().toLocaleDateString("tr-TR") + "\n\n📈 Günlük Ortalamalar:\n• Arama: " + currentMetrics.avgCalls + "\n• Teklif: " + currentMetrics.avgProposals + "\n• Online Ziyaret: " + currentMetrics.avgOnline + "\n• Fiziki Ziyaret: " + currentMetrics.avgPhysical + "\n• Toplam Ziyaret: " + currentMetrics.avgTotal + "\n• Aktif Çalışan: " + currentMetrics.activeCount + "/" + employees.length + "\n\nDashboard ekran görüntüsü için link: [Screenshot URL]";

    // WhatsApp Web URL'i oluştur
    const whatsappUrl = "https://wa.me/?text=" + encodeURIComponent(message);

    // Yeni sekmede WhatsApp Web'i aç
    window.open(whatsappUrl, "_blank");

    alert(
      "📱 WhatsApp Web açıldı! Mesajı istediğiniz kişiye gönderebilirsiniz."
    );
  };

  // Supabase işlemleri
  const loadDataFromSupabase = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from("data_entries")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Veri yükleme hatası:", error);
      } else {
        setDataEntries(data || []);
      }
    } catch (error) {
      console.error("Beklenmeyen hata:", error);
    } finally {
      setLoading(false);
    }
  };

  const loadTeams = async () => {
    try {
      const { data, error } = await supabase.from("teams").select("*");
      if (!error && data && data.length > 0) {
        setTeams(data);
      }
      // Eğer database'de veri yoksa, default teams kullanılır
    } catch (error) {
      console.error("Ekip yükleme hatası:", error);
      // Hata durumunda default teams kullanılır
    }
  };

  const loadKpiTargets = async () => {
    try {
      const { data, error } = await supabase.from("kpi_targets").select("*");
      if (!error && data && data.length > 0) {
        const targets = {};
        data.forEach((item) => {
          targets[item.metric_name] = item.target_value;
        });
        setKpiTargets(targets);
      }
      // Eğer database'de veri yoksa, default targets kullanılır
    } catch (error) {
      console.error("KPI hedef yükleme hatası:", error);
      // Hata durumunda default targets kullanılır
    }
  };

  const loadAdminSettings = async () => {
    try {
      const { data, error } = await supabase.from("admin_settings").select("*");
      if (!error && data && data.length > 0) {
        const settings = {};
        data.forEach((item) => {
          settings[item.setting_name] = item.setting_value;
        });
        setAdminSettings(settings);
      }
      // Eğer database'de veri yoksa, default settings kullanılır
    } catch (error) {
      console.error("Admin ayar yükleme hatası:", error);
      // Hata durumunda default settings kullanılır
    }
  };

  const verifyPassword = async (password, type, teamName = null) => {
    if (type === "admin") {
      return password === (adminSettings.admin_password || "1234");
    } else if (type === "team" && teamName) {
      const team = teams.find((t) => t.name === teamName);
      return team && password === team.password;
    }
    return false;
  };

  const saveToSupabase = async (entryData) => {
    try {
      setLoading(true);

      const calls = entryData.onLeave ? 0 : parseInt(entryData.calls) || 0;
      const proposals = entryData.onLeave
        ? 0
        : parseInt(entryData.proposals) || 0;
      const onlineVisits = entryData.onLeave
        ? 0
        : parseInt(entryData.onlineVisits) || 0;
      const physicalVisits = entryData.onLeave
        ? 0
        : parseInt(entryData.physicalVisits) || 0;

      const { data, error } = await supabase
        .from("data_entries")
        .insert([
          {
            date: entryData.date,
            employee: entryData.employee,
            team: selectedEmployee?.team || "",
            calls: calls,
            proposals: proposals,
            online_visits: onlineVisits,
            physical_visits: physicalVisits,
            total_visits: onlineVisits + physicalVisits,
            on_leave: entryData.onLeave === true,
          },
        ])
        .select();

      if (error) {
        alert("❌ Veri kaydedilemedi: " + error.message);
        return false;
      } else {
        await loadDataFromSupabase();
        return true;
      }
    } catch (error) {
      alert("❌ Beklenmeyen hata: " + error.message);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const bulkSaveToSupabase = async (bulkData, teamPassword) => {
    try {
      const isValidPassword = await verifyPassword(
        teamPassword,
        "team",
        bulkData.team
      );
      if (!isValidPassword) {
        alert("❌ Hatalı ekip şifresi!");
        return false;
      }

      setLoading(true);
      const entries = bulkData.employees.map((emp) => ({
        date: bulkData.date,
        employee: emp.name,
        team: emp.team,
        calls: emp.onLeave ? 0 : parseInt(emp.calls) || 0,
        proposals: emp.onLeave ? 0 : parseInt(emp.proposals) || 0,
        online_visits: emp.onLeave ? 0 : parseInt(emp.onlineVisits) || 0,
        physical_visits: emp.onLeave ? 0 : parseInt(emp.physicalVisits) || 0,
        total_visits: emp.onLeave
          ? 0
          : (parseInt(emp.onlineVisits) || 0) +
            (parseInt(emp.physicalVisits) || 0),
        on_leave: emp.onLeave === true,
      }));

      const { error } = await supabase.from("data_entries").insert(entries);

      if (error) {
        alert("❌ Toplu veri kaydedilemedi: " + error.message);
        return false;
      } else {
        await loadDataFromSupabase();
        return true;
      }
    } catch (error) {
      alert("❌ Beklenmeyen hata: " + error.message);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const deleteData = async (type, target, password) => {
    try {
      setLoading(true);
      let query = supabase.from("data_entries");

      if (type === "employee") {
        const teamName = employees.find((e) => e.name === target)?.team;
        if (!teamName || !(await verifyPassword(password, "team", teamName))) {
          alert("❌ Hatalı ekip şifresi!");
          return false;
        }
        query = query.delete().eq("employee", target);
      } else if (type === "team") {
        if (!(await verifyPassword(password, "team", target))) {
          alert("❌ Hatalı ekip şifresi!");
          return false;
        }
        query = query.delete().eq("team", target);
      } else if (type === "all") {
        if (!(await verifyPassword(password, "admin"))) {
          alert("❌ Hatalı yönetici şifresi!");
          return false;
        }
        query = query.delete().neq("id", 0);
      }

      const { error } = await query;

      if (error) {
        alert("❌ Silme işlemi başarısız: " + error.message);
        return false;
      } else {
        await loadDataFromSupabase();
        alert("✅ Veriler başarıyla silindi!");
        return true;
      }
    } catch (error) {
      alert("❌ Beklenmeyen hata: " + error.message);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const updatePassword = async (type, teamName, oldPassword, newPassword) => {
    try {
      if (type === "admin") {
        if (!(await verifyPassword(oldPassword, "admin"))) {
          alert("❌ Mevcut yönetici şifresi hatalı!");
          return false;
        }
        const { error } = await supabase
          .from("admin_settings")
          .update({ setting_value: newPassword })
          .eq("setting_name", "admin_password");

        if (!error) {
          await loadAdminSettings();
          alert("✅ Yönetici şifresi güncellendi!");
          return true;
        }
      } else if (type === "team") {
        if (!(await verifyPassword(oldPassword, "team", teamName))) {
          alert("❌ Mevcut ekip şifresi hatalı!");
          return false;
        }
        const { error } = await supabase
          .from("teams")
          .update({ password: newPassword })
          .eq("name", teamName);

        if (!error) {
          await loadTeams();
          alert("✅ Ekip şifresi güncellendi!");
          return true;
        }
      }
      return false;
    } catch (error) {
      alert("❌ Şifre güncellenirken hata: " + error.message);
      return false;
    }
  };

  const updateKpiTargets = async (targets, adminPassword) => {
    try {
      if (!(await verifyPassword(adminPassword, "admin"))) {
        alert("❌ Hatalı yönetici şifresi!");
        return false;
      }

      for (const [metricName, targetValue] of Object.entries(targets)) {
        await supabase
          .from("kpi_targets")
          .update({ target_value: parseInt(targetValue) })
          .eq("metric_name", metricName);
      }

      await loadKpiTargets();
      alert("✅ KPI hedefleri güncellendi!");
      return true;
    } catch (error) {
      alert("❌ KPI güncelleme hatası: " + error.message);
      return false;
    }
  };

  const addEmployee = async (employee, adminPassword) => {
    try {
      if (!(await verifyPassword(adminPassword, "admin"))) {
        alert("❌ Hatalı yönetici şifresi!");
        return false;
      }

      setEmployees((prev) => [...prev, { ...employee, performance: 85.0 }]);
      alert("✅ Çalışan eklendi!");
      return true;
    } catch (error) {
      alert("❌ Çalışan ekleme hatası: " + error.message);
      return false;
    }
  };

  const removeEmployee = async (employeeName, adminPassword) => {
    try {
      if (!(await verifyPassword(adminPassword, "admin"))) {
        alert("❌ Hatalı yönetici şifresi!");
        return false;
      }

      setEmployees((prev) => prev.filter((emp) => emp.name !== employeeName));
      alert("✅ Çalışan çıkarıldı!");
      return true;
    } catch (error) {
      alert("❌ Çalışan çıkarma hatası: " + error.message);
      return false;
    }
  };

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
      background: "linear-gradient(135deg, #2b579a, #1e3c72)",
      color: "white",
      padding: "20px",
      textAlign: "center",
      borderBottom: "4px solid #4472c4",
    },
    headerTitle: {
      fontSize: "2.2em",
      marginBottom: "5px",
      fontWeight: "600",
      textShadow: "0 2px 4px rgba(0, 0, 0, 0.3)",
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
      color: "#2b579a",
      borderBottom: "3px solid #4472c4",
      boxShadow: "0 -2px 8px rgba(68, 114, 196, 0.2)",
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
      borderLeft: "4px solid #4472c4",
      transition: "all 0.3s ease",
      position: "relative",
      overflow: "hidden",
    },
    metricValue: {
      fontSize: "2.5em",
      fontWeight: "bold",
      color: "#2b579a",
      marginBottom: "10px",
      textShadow: "0 1px 2px rgba(0, 0, 0, 0.1)",
    },
    metricLabel: {
      color: "#6c757d",
      fontWeight: "600",
      fontSize: "0.9em",
      marginBottom: "8px",
    },
    progressBar: {
      width: "100%",
      height: "8px",
      background: "#e9ecef",
      borderRadius: "4px",
      overflow: "hidden",
      margin: "10px 0",
      boxShadow: "inset 0 1px 3px rgba(0, 0, 0, 0.1)",
    },
    progressFill: {
      height: "100%",
      borderRadius: "4px",
      transition: "width 0.5s ease",
    },
    progressExcellent: {
      background: "linear-gradient(90deg, #28a745, #20c997)",
    },
    progressGood: {
      background: "linear-gradient(90deg, #ffc107, #fd7e14)",
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
      gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
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
      fontSize: "0.9em",
    },
    formControl: {
      width: "100%",
      padding: "12px 15px",
      border: "2px solid #e9ecef",
      borderRadius: "8px",
      fontSize: "14px",
      transition: "all 0.3s ease",
      background: "white",
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
      background: "linear-gradient(145deg, #4472c4, #2b579a)",
      color: "white",
      border: "none",
      padding: "15px 30px",
      borderRadius: "8px",
      fontWeight: "600",
      cursor: "pointer",
      fontSize: "16px",
      transition: "all 0.3s ease",
      boxShadow: "0 4px 10px rgba(68, 114, 196, 0.3)",
      margin: "5px",
      textTransform: "uppercase",
      letterSpacing: "0.5px",
    },
    btnSuccess: {
      background: "linear-gradient(145deg, #28a745, #20c997)",
      boxShadow: "0 4px 10px rgba(40, 167, 69, 0.3)",
    },
    btnDanger: {
      background: "linear-gradient(145deg, #dc3545, #c82333)",
      boxShadow: "0 4px 10px rgba(220, 53, 69, 0.3)",
    },
    btnWarning: {
      background: "linear-gradient(145deg, #ffc107, #e0a800)",
      color: "#212529",
      boxShadow: "0 4px 10px rgba(255, 193, 7, 0.3)",
    },
    btnInfo: {
      background: "linear-gradient(145deg, #17a2b8, #138496)",
      boxShadow: "0 4px 10px rgba(23, 162, 184, 0.3)",
    },
    btnDisabled: {
      background: "#6c757d",
      cursor: "not-allowed",
      opacity: 0.6,
    },
    modal: {
      display: "none",
      position: "fixed",
      zIndex: 1000,
      left: 0,
      top: 0,
      width: "100%",
      height: "100%",
      backgroundColor: "rgba(0, 0, 0, 0.5)",
      backdropFilter: "blur(5px)",
    },
    modalOpen: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    modalContent: {
      backgroundColor: "#fefefe",
      padding: "30px",
      borderRadius: "12px",
      width: "90%",
      maxWidth: "500px",
      boxShadow: "0 8px 25px rgba(0, 0, 0, 0.3)",
      position: "relative",
      maxHeight: "80vh",
      overflowY: "auto",
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
      background: "linear-gradient(145deg, #4472c4, #2b579a)",
      color: "white",
      padding: "15px 12px",
      textAlign: "left",
      fontWeight: "600",
      fontSize: "0.9em",
      textTransform: "uppercase",
      letterSpacing: "0.5px",
    },
    tableCell: {
      padding: "12px",
      borderBottom: "1px solid #e9ecef",
      fontSize: "0.9em",
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
    statusWarning: {
      background: "#fff3cd",
      color: "#856404",
      borderColor: "#ffc107",
    },
    statusError: {
      background: "#f8d7da",
      color: "#721c24",
      borderColor: "#dc3545",
    },
    adminCard: {
      background: "linear-gradient(145deg, #fff, #f8f9fa)",
      border: "2px solid #ffc107",
      borderRadius: "12px",
      padding: "25px",
      marginBottom: "20px",
      boxShadow: "0 4px 15px rgba(0, 0, 0, 0.1)",
    },
    bulkEmployeeRow: {
      display: "grid",
      gridTemplateColumns: "2fr 1fr 1fr 1fr 1fr 1fr",
      gap: "10px",
      alignItems: "center",
      padding: "10px",
      borderBottom: "1px solid #e9ecef",
      fontSize: "14px",
    },
    hierarchyContainer: {
      marginBottom: "30px",
    },
    teamHeader: {
      background: "linear-gradient(145deg, #4472c4, #2b579a)",
      color: "white",
      padding: "15px 20px",
      borderRadius: "8px",
      marginBottom: "15px",
      fontSize: "1.2em",
      fontWeight: "bold",
      cursor: "pointer",
      transition: "all 0.3s ease",
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
    exportButtons: {
      display: "flex",
      gap: "10px",
      marginBottom: "20px",
      flexWrap: "wrap",
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

    const success = await saveToSupabase(formData);

    if (success) {
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
    }
  };

  const openDeleteModal = (type, target) => {
    setDeleteType(type);
    setDeleteTarget(target);
    setShowDeleteModal(true);
  };

  const handleDelete = async () => {
    const success = await deleteData(deleteType, deleteTarget, passwordInput);
    if (success) {
      setShowDeleteModal(false);
      setPasswordInput("");
    }
  };

  const openPasswordModal = (action, team = "") => {
    setPasswordAction(action);
    setDeleteTarget(team);
    setOldPasswordInput("");
    setNewPasswordInput("");
    setShowPasswordModal(true);
  };

  const handlePasswordChange = async () => {
    if (!oldPasswordInput || !newPasswordInput) {
      alert("❌ Lütfen hem eski hem de yeni şifreyi girin!");
      return;
    }

    const success = await updatePassword(
      passwordAction,
      deleteTarget,
      oldPasswordInput,
      newPasswordInput
    );
    if (success) {
      setShowPasswordModal(false);
      setOldPasswordInput("");
      setNewPasswordInput("");
    }
  };

  const prepareBulkEntry = (teamName) => {
    const teamEmployees = employees.filter((emp) => emp.team === teamName);
    setBulkFormData({
      date: new Date().toISOString().split("T")[0],
      team: teamName,
      employees: teamEmployees.map((emp) => ({
        name: emp.name,
        team: emp.team,
        calls: "",
        proposals: "",
        onlineVisits: "",
        physicalVisits: "",
        onLeave: false,
      })),
    });
    setShowBulkPasswordModal(true);
  };

  const handleBulkPasswordSubmit = () => {
    setShowBulkPasswordModal(false);
    setShowBulkModal(true);
  };

  const handleBulkEmployeeChange = (index, field, value) => {
    setBulkFormData((prev) => ({
      ...prev,
      employees: prev.employees.map((emp, i) =>
        i === index ? { ...emp, [field]: value } : emp
      ),
    }));
  };

  const handleBulkSubmit = async () => {
    const success = await bulkSaveToSupabase(bulkFormData, passwordInput);
    if (success) {
      setShowBulkModal(false);
      setPasswordInput("");
      alert("✅ Toplu veri başarıyla kaydedildi!");
    }
  };

  const openEmailModal = (type, data = null) => {
    setEmailData({
      recipient: "",
      subject:
        type === "screenshot" ? "Dashboard Ekran Görüntüsü" : "Rapor Dosyası",
      type: type,
      data: data,
    });
    setShowEmailModal(true);
  };

  // Utility functions
  const MetricCard = ({ value, label, target, progress, progressType }) => (
    <div style={styles.metricCard}>
      <div style={styles.metricValue}>{value}</div>
      <div style={styles.metricLabel}>{label}</div>
      {target && (
        <div
          style={{
            color: "#28a745",
            fontSize: "0.8em",
            marginTop: "5px",
            fontWeight: "500",
          }}
        >
          Hedef: {target}
        </div>
      )}
      <div style={styles.progressBar}>
        <div
          style={{
            ...styles.progressFill,
            ...(progressType === "excellent"
              ? styles.progressExcellent
              : styles.progressGood),
            width: progress + "%",
          }}
        />
      </div>
    </div>
  );

  // Düzeltilmiş günlük ortalama hesaplama fonksiyonu - izinliler hariç
  const calculateMetrics = () => {
    if (dataEntries.length === 0)
      return {
        avgCalls: 0,
        avgProposals: 0,
        avgOnline: 0,
        avgPhysical: 0,
        avgTotal: 0,
        activeCount: 0,
      };

    const today = new Date().toISOString().split("T")[0];
    const todayEntries = dataEntries.filter(
      (e) => e.date === today && !e.on_leave
    ); // İzinliler hariç

    if (todayEntries.length === 0)
      return {
        avgCalls: 0,
        avgProposals: 0,
        avgOnline: 0,
        avgPhysical: 0,
        avgTotal: 0,
        activeCount: 0,
      };

    return {
      avgCalls: (
        todayEntries.reduce((sum, e) => sum + (e.calls || 0), 0) /
        todayEntries.length
      ).toFixed(1),
      avgProposals: (
        todayEntries.reduce((sum, e) => sum + (e.proposals || 0), 0) /
        todayEntries.length
      ).toFixed(1),
      avgOnline: (
        todayEntries.reduce((sum, e) => sum + (e.online_visits || 0), 0) /
        todayEntries.length
      ).toFixed(1),
      avgPhysical: (
        todayEntries.reduce((sum, e) => sum + (e.physical_visits || 0), 0) /
        todayEntries.length
      ).toFixed(1),
      avgTotal: (
        todayEntries.reduce((sum, e) => sum + (e.total_visits || 0), 0) /
        todayEntries.length
      ).toFixed(1),
      activeCount: todayEntries.length,
    };
  };

  const getConnectionStatus = () => {
    if (
      supabaseUrl === "BURAYA_PROJECT_URL_YAZACAKSIN" ||
      supabaseKey === "BURAYA_ANON_KEY_YAZACAKSIN"
    ) {
      return {
        type: "error",
        message: "❌ Supabase API anahtarları henüz ayarlanmadı!",
      };
    } else if (dataEntries.length > 0) {
      return {
        type: "success",
        message:
          "✅ Supabase bağlantısı başarılı! " +
          dataEntries.length +
          " kayıt bulundu.",
      };
    } else {
      return {
        type: "warning",
        message: "⚠️ Supabase bağlandı ama henüz veri yok. İlk kaydı girin!",
      };
    }
  };

  const calculateMonthlyRankings = () => {
    const currentMonth = new Date().toISOString().slice(0, 7);
    const monthlyEntries = dataEntries.filter(
      (e) => e.date.startsWith(currentMonth) && !e.on_leave
    );

    const employeeStats = {};
    monthlyEntries.forEach((entry) => {
      if (!employeeStats[entry.employee]) {
        employeeStats[entry.employee] = {
          name: entry.employee,
          team: entry.team,
          totalCalls: 0,
          totalProposals: 0,
          totalVisits: 0,
          days: 0,
        };
      }
      employeeStats[entry.employee].totalCalls += entry.calls || 0;
      employeeStats[entry.employee].totalProposals += entry.proposals || 0;
      employeeStats[entry.employee].totalVisits += entry.total_visits || 0;
      employeeStats[entry.employee].days += 1;
    });

    const teamStats = {};
    Object.values(employeeStats).forEach((emp) => {
      if (!teamStats[emp.team]) {
        teamStats[emp.team] = {
          name: emp.team,
          totalCalls: 0,
          totalProposals: 0,
          totalVisits: 0,
          employeeCount: 0,
          totalDays: 0,
        };
      }
      teamStats[emp.team].totalCalls += emp.totalCalls;
      teamStats[emp.team].totalProposals += emp.totalProposals;
      teamStats[emp.team].totalVisits += emp.totalVisits;
      teamStats[emp.team].employeeCount += 1;
      teamStats[emp.team].totalDays += emp.days;
    });

    const rankedEmployees = Object.values(employeeStats)
      .map((emp) => ({
        ...emp,
        avgCalls: emp.days > 0 ? (emp.totalCalls / emp.days).toFixed(1) : 0,
        avgProposals:
          emp.days > 0 ? (emp.totalProposals / emp.days).toFixed(1) : 0,
        avgVisits: emp.days > 0 ? (emp.totalVisits / emp.days).toFixed(1) : 0,
      }))
      .sort((a, b) => b.totalVisits - a.totalVisits);

    const rankedTeams = Object.values(teamStats)
      .map((team) => ({
        ...team,
        avgCalls:
          team.totalDays > 0
            ? (team.totalCalls / team.totalDays).toFixed(1)
            : 0,
        avgProposals:
          team.totalDays > 0
            ? (team.totalProposals / team.totalDays).toFixed(1)
            : 0,
        avgVisits:
          team.totalDays > 0
            ? (team.totalVisits / team.totalDays).toFixed(1)
            : 0,
      }))
      .sort((a, b) => b.totalVisits - a.totalVisits);

    return { rankedEmployees, rankedTeams };
  };

  // Alt ekip ortalamalarını hesaplama fonksiyonu
  const calculateTeamMetrics = (teamName) => {
    const today = new Date().toISOString().split("T")[0];
    const teamEntries = dataEntries.filter(
      (e) => e.date === today && e.team === teamName && !e.on_leave
    );

    if (teamEntries.length === 0)
      return { avgCalls: 0, avgProposals: 0, avgTotal: 0, activeCount: 0 };

    return {
      avgCalls: (
        teamEntries.reduce((sum, e) => sum + (e.calls || 0), 0) /
        teamEntries.length
      ).toFixed(1),
      avgProposals: (
        teamEntries.reduce((sum, e) => sum + (e.proposals || 0), 0) /
        teamEntries.length
      ).toFixed(1),
      avgTotal: (
        teamEntries.reduce((sum, e) => sum + (e.total_visits || 0), 0) /
        teamEntries.length
      ).toFixed(1),
      activeCount: teamEntries.length,
    };
  };

  const getUniqueTeams = () => {
    return [...new Set(employees.map((emp) => emp.team))];
  };

  const metrics = calculateMetrics();
  const connectionStatus = getConnectionStatus();
  const { rankedEmployees, rankedTeams } = calculateMonthlyRankings();

  // Render functions
  const renderDashboard = () => (
    <div ref={dashboardRef}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "20px",
        }}
      >
        <h2 style={{ margin: 0, color: "#2b579a" }}>
          📊 Günlük Ortalamalar & Paylaşım
        </h2>
        <div style={styles.exportButtons}>
          <button
            style={{ ...styles.btn, ...styles.btnSuccess }}
            onClick={sendWhatsApp}
          >
            📱 WhatsApp Gönder
          </button>
          <button
            style={{ ...styles.btn, ...styles.btnInfo }}
            onClick={() => openEmailModal("screenshot")}
          >
            📧 Email Gönder
          </button>
          <button
            style={{ ...styles.btn, ...styles.btnDanger }}
            onClick={refreshData}
            disabled={refreshing}
          >
            {refreshing ? "⏳ Yenileniyor..." : "🔄 Verileri Yenile"}
          </button>
        </div>
      </div>

      <div
        style={{
          ...styles.statusInfo,
          ...(connectionStatus.type === "success"
            ? styles.statusSuccess
            : connectionStatus.type === "warning"
            ? styles.statusWarning
            : styles.statusError),
        }}
      >
        {connectionStatus.message}
      </div>

      {/* Genel Ekip Metrikleri */}
      <div style={styles.metricsGrid}>
        <MetricCard
          value={metrics.avgCalls}
          label="Genel Ort. Arama"
          target={kpiTargets.calls || 45}
          progress={
            metrics.avgCalls
              ? Math.min(
                  (metrics.avgCalls / (kpiTargets.calls || 45)) * 100,
                  100
                )
              : 0
          }
          progressType="good"
        />
        <MetricCard
          value={metrics.avgProposals}
          label="Genel Ort. Teklif"
          target={kpiTargets.proposals || 5}
          progress={
            metrics.avgProposals
              ? Math.min(
                  (metrics.avgProposals / (kpiTargets.proposals || 5)) * 100,
                  100
                )
              : 0
          }
          progressType="good"
        />
        <MetricCard
          value={metrics.avgOnline}
          label="Genel Ort. Online Ziyaret"
          target={kpiTargets.online_visits || 2}
          progress={
            metrics.avgOnline
              ? Math.min(
                  (metrics.avgOnline / (kpiTargets.online_visits || 2)) * 100,
                  100
                )
              : 0
          }
          progressType="excellent"
        />
        <MetricCard
          value={metrics.avgPhysical}
          label="Genel Ort. Fiziki Ziyaret"
          target={kpiTargets.physical_visits || 1}
          progress={
            metrics.avgPhysical
              ? Math.min(
                  (metrics.avgPhysical / (kpiTargets.physical_visits || 1)) *
                    100,
                  100
                )
              : 0
          }
          progressType="excellent"
        />
        <MetricCard
          value={metrics.avgTotal}
          label="Genel Ort. Toplam Ziyaret"
          target={kpiTargets.total_visits || 3}
          progress={
            metrics.avgTotal
              ? Math.min(
                  (metrics.avgTotal / (kpiTargets.total_visits || 3)) * 100,
                  100
                )
              : 0
          }
          progressType="excellent"
        />
        <MetricCard
          value={metrics.activeCount + "/" + employees.length}
          label="👥 Bugün Aktif"
          target={"Katılım: " + Math.round((metrics.activeCount / employees.length) * 100) + "%"}
          progress={Math.round((metrics.activeCount / employees.length) * 100)}
          progressType="excellent"
        />
      </div>

      {/* Hiyerarşik Ekip Yapısı */}
      <div style={styles.hierarchyContainer}>
        <h3 style={{ color: "#2b579a", marginBottom: "20px" }}>
          🏢 Ekip Hiyerarşisi ve Günlük Performans
        </h3>

        {getUniqueTeams().map((teamName) => {
          const teamMetrics = calculateTeamMetrics(teamName);
          const teamEmployees = employees.filter(
            (emp) => emp.team === teamName
          );

          return (
            <div key={teamName} style={{ marginBottom: "25px" }}>
              <div style={styles.teamHeader}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <span>🏢 {teamName}</span>
                  <div style={{ fontSize: "0.9em", opacity: 0.9 }}>
                    Arama {teamMetrics.avgCalls} | Teklif{" "}
                    {teamMetrics.avgProposals} | Toplam Ziyaret{" "}
                    {teamMetrics.avgTotal} | 👥 {teamMetrics.activeCount}/
                    {teamEmployees.length}
                  </div>
                </div>
              </div>

              <div style={styles.employeeList}>
                {teamEmployees.map((emp) => {
                  const empEntries = dataEntries.filter(
                    (e) =>
                      e.date === new Date().toISOString().split("T")[0] &&
                      e.employee === emp.name
                  );

                  const todayEntry = empEntries[0];
                  const isActive = todayEntry && !todayEntry.on_leave;
                  const isOnLeave = todayEntry && todayEntry.on_leave;

                  return (
                    <div
                      key={emp.name}
                      style={{
                        ...styles.employeeItem,
                        borderLeft: "4px solid " + (isActive
                            ? "#28a745"
                            : isOnLeave
                            ? "#ffc107"
                            : "#dc3545"),
                      }}
                    >
                      <div>
                        <strong>{emp.name}</strong> - {emp.segment}
                        {isOnLeave && (
                          <span
                            style={{ color: "#ffc107", marginLeft: "10px" }}
                          >
                            🏖️ İzinli
                          </span>
                        )}
                      </div>
                      <div style={{ fontSize: "0.9em" }}>
                        {isActive ? (
                          <React.Fragment>
                            Arama {todayEntry.calls} | Teklif{" "}
                            {todayEntry.proposals} | Toplam Ziyaret{" "}
                            {todayEntry.total_visits}
                          </React.Fragment>
                        ) : isOnLeave ? (
                          <span style={{ color: "#856404" }}>İzinli</span>
                        ) : (
                          <span style={{ color: "#dc3545" }}>Veri yok</span>
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

      <div style={styles.formContainer}>
        <h3 style={{ color: "#2b579a", marginBottom: "20px" }}>
          🚀 Hızlı İşlemler
        </h3>
        <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
          {teams.map((team) => (
            <button
              key={team.name}
              style={{ ...styles.btn, ...styles.btnWarning }}
              onClick={() => prepareBulkEntry(team.name)}
            >
              📝 {team.name} Toplu Giriş
            </button>
          ))}
        </div>
      </div>
    </div>
  );

  const renderDataEntry = () => (
    <div style={styles.formContainer}>
      <h2 style={{ marginBottom: "20px", color: "#2b579a" }}>
        📝 Tekli Veri Girişi
      </h2>

      <div style={styles.formGrid}>
        <div>
          <div style={styles.formGroup}>
            <div style={styles.label}>📅 Tarih</div>
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
            <div style={styles.label}>👤 Çalışan Seçin</div>
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
            <React.Fragment>
              <div style={styles.formGroup}>
                <div style={styles.label}>🏢 Ekip</div>
                <div style={styles.autoField}>{selectedEmployee.team}</div>
              </div>
              <div style={styles.formGroup}>
                <div style={styles.label}>📋 Segment</div>
                <div style={styles.autoField}>{selectedEmployee.segment}</div>
              </div>
            </React.Fragment>
          )}
        </div>
        <div>
          <div style={styles.formGroup}>
            <div style={styles.label}>Arama Sayısı</div>
            <input
              type="number"
              name="calls"
              value={formData.calls}
              onChange={handleInputChange}
              style={styles.formControl}
              placeholder={"Hedef: " + (kpiTargets.calls || 45)}
              disabled={formData.onLeave || loading}
            />
          </div>
          <div style={styles.formGroup}>
            <div style={styles.label}>Teklif Sayısı</div>
            <input
              type="number"
              name="proposals"
              value={formData.proposals}
              onChange={handleInputChange}
              style={styles.formControl}
              placeholder={"Hedef: " + (kpiTargets.proposals || 5)}
              disabled={formData.onLeave || loading}
            />
          </div>
          <div style={styles.formGroup}>
            <div style={styles.label}>Online Ziyaret</div>
            <input
              type="number"
              name="onlineVisits"
              value={formData.onlineVisits}
              onChange={handleInputChange}
              style={styles.formControl}
              placeholder={kpiTargets.online_visits || 2}
              disabled={formData.onLeave || loading}
            />
          </div>
          <div style={styles.formGroup}>
            <div style={styles.label}>Fiziki Ziyaret</div>
            <input
              type="number"
              name="physicalVisits"
              value={formData.physicalVisits}
              onChange={handleInputChange}
              style={styles.formControl}
              placeholder={kpiTargets.physical_visits || 1}
              disabled={formData.onLeave || loading}
            />
          </div>
          <div style={styles.formGroup}>
            <div style={styles.label}>
              <input
                type="checkbox"
                name="onLeave"
                checked={formData.onLeave}
                onChange={handleInputChange}
                style={{ marginRight: "8px" }}
                disabled={loading}
              />
              🏖️ İzinli/Hasta
            </div>
          </div>
        </div>
      </div>

      <div style={{ display: "flex", gap: "10px", marginTop: "20px" }}>
        <button
          onClick={handleSubmit}
          style={{ ...styles.btn, ...styles.btnSuccess, flex: 1 }}
          disabled={loading || connectionStatus.type === "error"}
        >
          {loading ? "⏳ Kaydediyor..." : "💾 Kaydet"}
        </button>
      </div>

      {dataEntries.length > 0 && (
        <div style={{ marginTop: "30px" }}>
          <h3 style={{ color: "#2b579a", marginBottom: "15px" }}>
            📋 Son Veriler
          </h3>
          <div style={{ overflowX: "auto" }}>
            <table style={styles.table}>
              <thead>
                <tr>
                  <th style={styles.tableHeader}>Tarih</th>
                  <th style={styles.tableHeader}>Çalışan</th>
                  <th style={styles.tableHeader}>Arama</th>
                  <th style={styles.tableHeader}>Teklif</th>
                  <th style={styles.tableHeader}>Online Ziyaret</th>
                  <th style={styles.tableHeader}>Fiziki Ziyaret</th>
                  <th style={styles.tableHeader}>Toplam Ziyaret</th>
                  <th style={styles.tableHeader}>Durum</th>
                  <th style={styles.tableHeader}>İşlem</th>
                </tr>
              </thead>
              <tbody>
                {dataEntries.slice(0, 20).map((entry, index) => (
                  <tr
                    key={entry.id}
                    style={
                      index % 2 === 0 ? { backgroundColor: "#f8f9fa" } : {}
                    }
                  >
                    <td style={styles.tableCell}>{entry.date}</td>
                    <td style={styles.tableCell}>
                      <strong>{entry.employee}</strong>
                    </td>
                    <td style={styles.tableCell}>
                      {entry.on_leave ? "-" : entry.calls}
                    </td>
                    <td style={styles.tableCell}>
                      {entry.on_leave ? "-" : entry.proposals}
                    </td>
                    <td style={styles.tableCell}>
                      {entry.on_leave ? "-" : entry.online_visits}
                    </td>
                    <td style={styles.tableCell}>
                      {entry.on_leave ? "-" : entry.physical_visits}
                    </td>
                    <td style={styles.tableCell}>
                      <strong>
                        {entry.on_leave ? "-" : entry.total_visits}
                      </strong>
                    </td>
                    <td style={styles.tableCell}>
                      <span
                        style={{
                          color: entry.on_leave ? "#ffc107" : "#28a745",
                          fontWeight: "bold",
                        }}
                      >
                        {entry.on_leave ? "🏖️ İzinli" : "✅ Aktif"}
                      </span>
                    </td>
                    <td style={styles.tableCell}>
                      <button
                        style={{
                          ...styles.btn,
                          ...styles.btnDanger,
                          padding: "5px 10px",
                          fontSize: "12px",
                          margin: "0",
                        }}
                        onClick={() =>
                          openDeleteModal("employee", entry.employee)
                        }
                      >
                        🗑️
                      </button>
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

  const renderBulkEntry = () => (
    <div style={styles.formContainer}>
      <h2 style={{ marginBottom: "20px", color: "#2b579a" }}>
        📊 Toplu Veri Girişi
      </h2>

      <div
        style={{
          display: "flex",
          gap: "15px",
          flexWrap: "wrap",
          marginBottom: "30px",
        }}
      >
        {teams.map((team) => (
          <button
            key={team.name}
            style={{ ...styles.btn, ...styles.btnWarning }}
            onClick={() => prepareBulkEntry(team.name)}
          >
            📝 {team.name}
          </button>
        ))}
      </div>

      <div style={styles.formContainer}>
        <h3 style={{ color: "#2b579a", marginBottom: "20px" }}>
          🗑️ Toplu Silme İşlemleri
        </h3>
        <div
          style={{
            display: "flex",
            gap: "15px",
            flexWrap: "wrap",
            marginBottom: "20px",
          }}
        >
          {teams.map((team) => (
            <button
              key={team.name}
              style={{ ...styles.btn, ...styles.btnDanger }}
              onClick={() => openDeleteModal("team", team.name)}
            >
              🗑️ {team.name}
            </button>
          ))}
          <button
            style={{ ...styles.btn, ...styles.btnDanger }}
            onClick={() => openDeleteModal("all", "all")}
          >
            🗑️ TÜM VERİLER
          </button>
        </div>
      </div>
    </div>
  );

  const renderAdmin = () => (
    <div>
      <div style={styles.adminCard}>
        <h2 style={{ marginBottom: "20px", color: "#2b579a" }}>
          👨‍💼 Yönetici Paneli
        </h2>
        <div
          style={{ color: "#856404", marginBottom: "20px", fontWeight: "bold" }}
        >
          🔐 Bu panel sadece yöneticiler içindir. İşlem yapmak için şifre
          gerekir.
        </div>
      </div>

      <div style={styles.formContainer}>
        <h3 style={{ color: "#2b579a", marginBottom: "20px" }}>
          👥 Çalışan Yönetimi
        </h3>

        <div style={styles.formGrid}>
          <div>
            <h4>➕ Yeni Çalışan Ekle</h4>
            <div style={styles.formGroup}>
              <div style={styles.label}>👤 Ad Soyad</div>
              <input
                type="text"
                style={styles.formControl}
                value={adminFormData.newEmployee.name}
                onChange={(e) =>
                  setAdminFormData((prev) => ({
                    ...prev,
                    newEmployee: { ...prev.newEmployee, name: e.target.value },
                  }))
                }
                placeholder="Çalışan adı"
              />
            </div>
            <div style={styles.formGroup}>
              <div style={styles.label}>🏢 Ekip</div>
              <select
                style={styles.formControl}
                value={adminFormData.newEmployee.team}
                onChange={(e) =>
                  setAdminFormData((prev) => ({
                    ...prev,
                    newEmployee: { ...prev.newEmployee, team: e.target.value },
                  }))
                }
              >
                <option value="">-- Ekip Seçin --</option>
                {teams.map((team) => (
                  <option key={team.name} value={team.name}>
                    {team.name}
                  </option>
                ))}
              </select>
            </div>
            <div style={styles.formGroup}>
              <div style={styles.label}>📋 Segment</div>
              <select
                style={styles.formControl}
                value={adminFormData.newEmployee.segment}
                onChange={(e) =>
                  setAdminFormData((prev) => ({
                    ...prev,
                    newEmployee: {
                      ...prev.newEmployee,
                      segment: e.target.value,
                    },
                  }))
                }
              >
                <option value="BM">BM</option>
                <option value="ÖM">ÖM</option>
              </select>
            </div>
            <div style={styles.formGroup}>
              <div style={styles.label}>🔐 Yönetici Şifresi</div>
              <input
                type="password"
                style={styles.formControl}
                placeholder="Şifre gerekli"
                onKeyPress={(e) => {
                  if (e.key === "Enter") {
                    addEmployee(adminFormData.newEmployee, e.target.value);
                    e.target.value = "";
                    setAdminFormData((prev) => ({
                      ...prev,
                      newEmployee: { name: "", team: "", segment: "BM" },
                    }));
                  }
                }}
              />
            </div>
          </div>

          <div>
            <h4>➖ Çalışan Çıkar</h4>
            <div style={styles.formGroup}>
              <div style={styles.label}>👤 Çalışan Seç</div>
              <select style={styles.formControl} id="removeEmployeeSelect">
                <option value="">-- Çıkarılacak Çalışan --</option>
                {employees.map((emp) => (
                  <option key={emp.name} value={emp.name}>
                    {emp.name} - {emp.team}
                  </option>
                ))}
              </select>
            </div>
            <div style={styles.formGroup}>
              <div style={styles.label}>🔐 Yönetici Şifresi</div>
              <input
                type="password"
                style={styles.formControl}
                placeholder="Şifre gerekli"
                onKeyPress={(e) => {
                  if (e.key === "Enter") {
                    const selectedEmp = document.getElementById(
                      "removeEmployeeSelect"
                    ).value;
                    if (selectedEmp) {
                      removeEmployee(selectedEmp, e.target.value);
                      e.target.value = "";
                      document.getElementById("removeEmployeeSelect").value =
                        "";
                    }
                  }
                }}
              />
            </div>
          </div>
        </div>
      </div>

      <div style={styles.formContainer}>
        <h3 style={{ color: "#2b579a", marginBottom: "20px" }}>
          🎯 KPI Hedefleri Güncelle
        </h3>

        <div style={styles.formGrid}>
          <div>
            <div style={styles.formGroup}>
              <div style={styles.label}>Arama Hedefi</div>
              <input
                type="number"
                style={styles.formControl}
                defaultValue={kpiTargets.calls || 45}
                onBlur={(e) =>
                  setAdminFormData((prev) => ({
                    ...prev,
                    kpiUpdates: { ...prev.kpiUpdates, calls: e.target.value },
                  }))
                }
              />
            </div>
            <div style={styles.formGroup}>
              <div style={styles.label}>Teklif Hedefi</div>
              <input
                type="number"
                style={styles.formControl}
                defaultValue={kpiTargets.proposals || 5}
                onBlur={(e) =>
                  setAdminFormData((prev) => ({
                    ...prev,
                    kpiUpdates: {
                      ...prev.kpiUpdates,
                      proposals: e.target.value,
                    },
                  }))
                }
              />
            </div>
          </div>
          <div>
            <div style={styles.formGroup}>
              <div style={styles.label}>Online Ziyaret Hedefi</div>
              <input
                type="number"
                style={styles.formControl}
                defaultValue={kpiTargets.online_visits || 2}
                onBlur={(e) =>
                  setAdminFormData((prev) => ({
                    ...prev,
                    kpiUpdates: {
                      ...prev.kpiUpdates,
                      online_visits: e.target.value,
                    },
                  }))
                }
              />
            </div>
            <div style={styles.formGroup}>
              <div style={styles.label}>Fiziki Ziyaret Hedefi</div>
              <input
                type="number"
                style={styles.formControl}
                defaultValue={kpiTargets.physical_visits || 1}
                onBlur={(e) =>
                  setAdminFormData((prev) => ({
                    ...prev,
                    kpiUpdates: {
                      ...prev.kpiUpdates,
                      physical_visits: e.target.value,
                    },
                  }))
                }
              />
            </div>
          </div>
        </div>

        <div style={styles.formGroup}>
          <div style={styles.label}>🔐 Yönetici Şifresi</div>
          <input
            type="password"
            style={styles.formControl}
            placeholder="KPI güncellemek için şifre girin"
            onKeyPress={(e) => {
              if (
                e.key === "Enter" &&
                Object.keys(adminFormData.kpiUpdates).length > 0
              ) {
                updateKpiTargets(adminFormData.kpiUpdates, e.target.value);
                e.target.value = "";
                setAdminFormData((prev) => ({ ...prev, kpiUpdates: {} }));
              }
            }}
          />
        </div>
      </div>
    </div>
  );

  const renderPasswordManagement = () => (
    <div>
      <div style={styles.formContainer}>
        <h2 style={{ marginBottom: "20px", color: "#2b579a" }}>
          🔐 Şifre Yönetimi
        </h2>

        <div style={styles.formGrid}>
          <div>
            <h3>👨‍💼 Yönetici Şifresi</h3>
            <button
              style={{ ...styles.btn, ...styles.btnWarning }}
              onClick={() => openPasswordModal("admin")}
            >
              🔑 Yönetici Şifresi Değiştir
            </button>
          </div>

          <div>
            <h3>👥 Ekip Şifreleri</h3>
            {teams.map((team) => (
              <button
                key={team.name}
                style={{
                  ...styles.btn,
                  ...styles.btnSuccess,
                  margin: "5px",
                  display: "block",
                  width: "100%",
                }}
                onClick={() => openPasswordModal("team", team.name)}
              >
                🔑 {team.name}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div style={styles.formContainer}>
        <h3 style={{ color: "#2b579a", marginBottom: "20px" }}>
          📋 Ekip Şifre Durumları
        </h3>
        <div
          style={{
            color: "#856404",
            marginBottom: "15px",
            fontStyle: "italic",
          }}
        >
          ⚠️ Güvenlik nedeniyle şifreler gizlenmektedir.
        </div>
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.tableHeader}>Ekip</th>
              <th style={styles.tableHeader}>Şifre Durumu</th>
              <th style={styles.tableHeader}>Son Güncelleme</th>
            </tr>
          </thead>
          <tbody>
            {teams.map((team) => (
              <tr key={team.name}>
                <td style={styles.tableCell}>
                  <strong>{team.name}</strong>
                </td>
                <td style={styles.tableCell}>
                  <span style={{ color: "#28a745", fontWeight: "bold" }}>
                    ✅ Ayarlanmış
                  </span>
                </td>
                <td style={styles.tableCell}>
                  {new Date(team.created_at).toLocaleDateString("tr-TR")}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  // Aylık sıralama - puan kaldırıldı
  const renderMonthly = () => (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "20px",
        }}
      >
        <h2 style={{ color: "#2b579a", margin: 0 }}>
          📊 Aylık Performans Sıralaması
        </h2>
        <div style={styles.exportButtons}>
          <button
            style={{ ...styles.btn, ...styles.btnSuccess }}
            onClick={() => {
              const exportData = rankedEmployees.map((emp) => ({
                Sıra: rankedEmployees.indexOf(emp) + 1,
                Çalışan: emp.name,
                Ekip: emp.team,
                "Ort Arama": emp.avgCalls,
                "Ort Teklif": emp.avgProposals,
                "Ort Ziyaret": emp.avgVisits,
                Gün: emp.days,
              }));
              exportToExcel(exportData, "aylik_sirala_bireysel");
            }}
          >
            📊 Bireysel Excel
          </button>
          <button
            style={{ ...styles.btn, ...styles.btnInfo }}
            onClick={() => {
              const exportData = rankedTeams.map((team) => ({
                Sıra: rankedTeams.indexOf(team) + 1,
                Ekip: team.name,
                "Ort Arama": team.avgCalls,
                "Ort Teklif": team.avgProposals,
                "Ort Ziyaret": team.avgVisits,
                "Çalışan Sayısı": team.employeeCount,
              }));
              exportToExcel(exportData, "aylik_sirala_ekip");
            }}
          >
            🏢 Ekip Excel
          </button>
          <button
            style={{ ...styles.btn, ...styles.btnWarning }}
            onClick={() => openEmailModal("report", rankedEmployees)}
          >
            📧 Rapor Email
          </button>
        </div>
      </div>

      <div style={styles.metricsGrid}>
        <MetricCard
          value={rankedEmployees.length.toString()}
          label="👥 Aktif Çalışan"
        />
        <MetricCard
          value={rankedTeams.length.toString()}
          label="🏢 Aktif Ekip"
        />
        <MetricCard
          value={dataEntries
            .filter((e) =>
              e.date.startsWith(new Date().toISOString().slice(0, 7))
            )
            .length.toString()}
          label="📈 Bu Ay Toplam Giriş"
        />
        <MetricCard value="22" label="📅 İş Günü" />
      </div>

      <div style={styles.formContainer}>
        <h3 style={{ color: "#2b579a", marginBottom: "20px" }}>
          🏆 Ekip Sıralaması
        </h3>
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.tableHeader}>Sıra</th>
              <th style={styles.tableHeader}>Ekip</th>
              <th style={styles.tableHeader}>Ort. Arama</th>
              <th style={styles.tableHeader}>Ort. Teklif</th>
              <th style={styles.tableHeader}>Ort. Ziyaret</th>
              <th style={styles.tableHeader}>👥 Çalışan</th>
            </tr>
          </thead>
          <tbody>
            {rankedTeams.map((team, index) => (
              <tr
                key={team.name}
                style={
                  index < 3
                    ? { backgroundColor: "#f8f9fa", fontWeight: "bold" }
                    : {}
                }
              >
                <td style={styles.tableCell}>
                  {index === 0
                    ? "🥇"
                    : index === 1
                    ? "🥈"
                    : index === 2
                    ? "🥉"
                    : index + 1}
                </td>
                <td style={styles.tableCell}>
                  <strong>{team.name}</strong>
                </td>
                <td style={styles.tableCell}>{team.avgCalls}</td>
                <td style={styles.tableCell}>{team.avgProposals}</td>
                <td style={styles.tableCell}>{team.avgVisits}</td>
                <td style={styles.tableCell}>{team.employeeCount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div style={styles.formContainer}>
        <h3 style={{ color: "#2b579a", marginBottom: "20px" }}>
          🏆 Bireysel Sıralama
        </h3>
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.tableHeader}>Sıra</th>
              <th style={styles.tableHeader}>Çalışan</th>
              <th style={styles.tableHeader}>Ekip</th>
              <th style={styles.tableHeader}>Ort. Arama</th>
              <th style={styles.tableHeader}>Ort. Teklif</th>
              <th style={styles.tableHeader}>Ort. Ziyaret</th>
              <th style={styles.tableHeader}>📅 Gün</th>
            </tr>
          </thead>
          <tbody>
            {rankedEmployees.slice(0, 20).map((employee, index) => (
              <tr
                key={employee.name}
                style={
                  index < 3
                    ? { backgroundColor: "#f8f9fa", fontWeight: "bold" }
                    : {}
                }
              >
                <td style={styles.tableCell}>
                  {index === 0
                    ? "🥇"
                    : index === 1
                    ? "🥈"
                    : index === 2
                    ? "🥉"
                    : index + 1}
                </td>
                <td style={styles.tableCell}>
                  <strong>{employee.name}</strong>
                </td>
                <td style={styles.tableCell}>{employee.team}</td>
                <td style={styles.tableCell}>{employee.avgCalls}</td>
                <td style={styles.tableCell}>{employee.avgProposals}</td>
                <td style={styles.tableCell}>{employee.avgVisits}</td>
                <td style={styles.tableCell}>{employee.days}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  const renderCharts = () => (
    <div>
      <h2 style={{ marginBottom: "20px", color: "#2b579a" }}>
        📈 Grafikler ve İstatistikler
      </h2>
      <div style={styles.formContainer}>
        <h3>🚧 Geliştirme Aşamasında</h3>
        <p>Bu bölümde ileride Chart.js ile detaylı grafikler eklenecek.</p>
      </div>
    </div>
  );

  const renderTabContent = () => {
    switch (activeTab) {
      case "dashboard":
        return renderDashboard();
      case "data-entry":
        return renderDataEntry();
      case "bulk-entry":
        return renderBulkEntry();
      case "monthly":
        return renderMonthly();
      case "charts":
        return renderCharts();
      case "admin":
        return renderAdmin();
      case "password-management":
        return renderPasswordManagement();
      default:
        return renderDashboard();
    }
  };

  return (
    <div
      style={{
        fontFamily: '"Segoe UI", Tahoma, Geneva, Verdana, sans-serif',
        background: "linear-gradient(135deg, #1e3c72, #2a5298)",
        minHeight: "100vh",
        color: "#333",
        lineHeight: "1.6",
      }}
    >
      <div style={styles.container}>
        <div style={styles.header}>
          <h1 style={styles.headerTitle}>
            📊 İstanbul Müşteriler KPI Dashboard
          </h1>
          <div style={{ opacity: 0.9, fontSize: "1.1em", fontWeight: "300" }}>
            {new Date().toLocaleDateString("tr-TR", {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
            })}{" "}
            - Güvenli Sistem
          </div>
        </div>

        <nav style={styles.navBar}>
          {[
            { id: "dashboard", label: "Dashboard" },
            { id: "data-entry", label: "Veri Girişi" },
            { id: "bulk-entry", label: "Toplu İşlem" },
            { id: "monthly", label: "Aylık Sıralama" },
            { id: "charts", label: "Grafikler" },
            { id: "admin", label: "Yönetici" },
            { id: "password-management", label: "Şifre Yönetimi" },
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
      <div
        style={{ ...styles.modal, ...(showEmailModal ? styles.modalOpen : {}) }}
      >
        <div style={styles.modalContent}>
          <h3>📧 Email Gönder</h3>
          <div style={styles.formGroup}>
            <div style={styles.label}>👤 Alıcı Email</div>
            <input
              type="email"
              style={styles.formControl}
              placeholder="ornek@email.com"
              value={emailData.recipient}
              onChange={(e) =>
                setEmailData((prev) => ({ ...prev, recipient: e.target.value }))
              }
            />
          </div>
          <div style={styles.formGroup}>
            <div style={styles.label}>📝 Konu</div>
            <input
              type="text"
              style={styles.formControl}
              value={emailData.subject}
              onChange={(e) =>
                setEmailData((prev) => ({ ...prev, subject: e.target.value }))
              }
            />
          </div>
          <div style={{ marginTop: "20px", display: "flex", gap: "10px" }}>
            <button
              style={{ ...styles.btn, ...styles.btnSuccess }}
              onClick={() => sendEmail(emailData.type, emailData.data)}
            >
              📧 Gönder
            </button>
            <button style={styles.btn} onClick={() => setShowEmailModal(false)}>
              ❌ İptal
            </button>
          </div>
        </div>
      </div>

      {/* Delete Modal */}
      <div
        style={{
          ...styles.modal,
          ...(showDeleteModal ? styles.modalOpen : {}),
        }}
      >
        <div style={styles.modalContent}>
          <h3>🔐 Veri Silme Onayı</h3>
          <p>
           {deleteType === "employee" &&
  deleteTarget + " çalışanının tüm verilerini silmek için ekip şifresini girin:"}
{deleteType === "team" &&
  deleteTarget + " ekibinin tüm verilerini silmek için ekip şifresini girin:"}
{deleteType === "all" &&
  "TÜM VERİLERİ silmek için yönetici şifresini girin:"}
          </p>
          <input
            type="password"
            style={styles.formControl}
            placeholder={
              deleteType === "all" ? "Yönetici Şifresi" : "Ekip Şifresi"
            }
            value={passwordInput}
            onChange={(e) => setPasswordInput(e.target.value)}
          />
          <div style={{ marginTop: "20px", display: "flex", gap: "10px" }}>
            <button
              style={{ ...styles.btn, ...styles.btnDanger }}
              onClick={handleDelete}
            >
              🗑️ SİL
            </button>
            <button
              style={styles.btn}
              onClick={() => setShowDeleteModal(false)}
            >
              ❌ İptal
            </button>
          </div>
        </div>
      </div>

      {/* Password Modal */}
      <div
        style={{
          ...styles.modal,
          ...(showPasswordModal ? styles.modalOpen : {}),
        }}
      >
        <div style={styles.modalContent}>
          <h3>🔑 Şifre Değiştir</h3>
          <p>
            {passwordAction === "admin"
              ? "Yönetici şifresi değiştirmek için:"
              : deleteTarget + " ekip şifresini değiştirmek için:"}
          </p>
          <div style={styles.formGroup}>
            <div style={styles.label}>🔒 Mevcut Şifre</div>
            <input
              type="password"
              style={styles.formControl}
              placeholder="Mevcut şifrenizi girin"
              value={oldPasswordInput}
              onChange={(e) => setOldPasswordInput(e.target.value)}
            />
          </div>
          <div style={styles.formGroup}>
            <div style={styles.label}>🔑 Yeni Şifre</div>
            <input
              type="password"
              style={styles.formControl}
              placeholder="Yeni şifrenizi girin"
              value={newPasswordInput}
              onChange={(e) => setNewPasswordInput(e.target.value)}
            />
          </div>
          <div style={{ marginTop: "20px", display: "flex", gap: "10px" }}>
            <button
              style={{ ...styles.btn, ...styles.btnSuccess }}
              onClick={handlePasswordChange}
            >
              🔑 Şifreyi Değiştir
            </button>
            <button
              style={styles.btn}
              onClick={() => {
                setShowPasswordModal(false);
                setOldPasswordInput("");
                setNewPasswordInput("");
              }}
            >
              ❌ İptal
            </button>
          </div>
        </div>
      </div>

      {/* Bulk Password Modal */}
      <div
        style={{
          ...styles.modal,
          ...(showBulkPasswordModal ? styles.modalOpen : {}),
        }}
      >
        <div style={styles.modalContent}>
          <h3>🔐 Toplu Veri Girişi - Şifre Kontrolü</h3>
          <p>
            <strong>{bulkFormData.team}</strong> ekibi için toplu veri girişi
            yapacaksınız.
          </p>
          <p>Devam etmek için ekip şifresini girin:</p>
          <input
            type="password"
            style={styles.formControl}
            placeholder="Ekip Şifresi"
            value={passwordInput}
            onChange={(e) => setPasswordInput(e.target.value)}
          />
          <div style={{ marginTop: "20px", display: "flex", gap: "10px" }}>
            <button
              style={{ ...styles.btn, ...styles.btnSuccess }}
              onClick={handleBulkPasswordSubmit}
            >
              ✅ Devam Et
            </button>
            <button
              style={styles.btn}
              onClick={() => setShowBulkPasswordModal(false)}
            >
              ❌ İptal
            </button>
          </div>
        </div>
      </div>

      {/* Bulk Entry Modal */}
      <div
        style={{ ...styles.modal, ...(showBulkModal ? styles.modalOpen : {}) }}
      >
        <div
          style={{ ...styles.modalContent, maxWidth: "90%", width: "1000px" }}
        >
          <h3>📊 {bulkFormData.team} - Toplu Veri Girişi</h3>
          <p>Tarih: {bulkFormData.date}</p>

          <div style={{ overflowX: "auto", marginTop: "20px" }}>
            <div style={styles.bulkEmployeeRow}>
              <div>
                <strong>Çalışan</strong>
              </div>
              <div>
                <strong>Arama</strong>
              </div>
              <div>
                <strong>Teklif</strong>
              </div>
              <div>
                <strong>Online Ziyaret</strong>
              </div>
              <div>
                <strong>Fiziki Ziyaret</strong>
              </div>
              <div>
                <strong>🏖️ İzinli</strong>
              </div>
            </div>

            {bulkFormData.employees.map((emp, index) => (
              <div key={emp.name} style={styles.bulkEmployeeRow}>
                <div>
                  <strong>{emp.name}</strong>
                </div>
                <div>
                  <input
                    type="number"
                    style={{ ...styles.formControl, margin: 0, padding: "8px" }}
                    value={emp.calls}
                    onChange={(e) =>
                      handleBulkEmployeeChange(index, "calls", e.target.value)
                    }
                    disabled={emp.onLeave}
                    placeholder="45"
                  />
                </div>
                <div>
                  <input
                    type="number"
                    style={{ ...styles.formControl, margin: 0, padding: "8px" }}
                    value={emp.proposals}
                    onChange={(e) =>
                      handleBulkEmployeeChange(
                        index,
                        "proposals",
                        e.target.value
                      )
                    }
                    disabled={emp.onLeave}
                    placeholder="5"
                  />
                </div>
                <div>
                  <input
                    type="number"
                    style={{ ...styles.formControl, margin: 0, padding: "8px" }}
                    value={emp.onlineVisits}
                    onChange={(e) =>
                      handleBulkEmployeeChange(
                        index,
                        "onlineVisits",
                        e.target.value
                      )
                    }
                    disabled={emp.onLeave}
                    placeholder="2"
                  />
                </div>
                <div>
                  <input
                    type="number"
                    style={{ ...styles.formControl, margin: 0, padding: "8px" }}
                    value={emp.physicalVisits}
                    onChange={(e) =>
                      handleBulkEmployeeChange(
                        index,
                        "physicalVisits",
                        e.target.value
                      )
                    }
                    disabled={emp.onLeave}
                    placeholder="1"
                  />
                </div>
                <div>
                  <input
                    type="checkbox"
                    checked={emp.onLeave}
                    onChange={(e) =>
                      handleBulkEmployeeChange(
                        index,
                        "onLeave",
                        e.target.checked
                      )
                    }
                  />
                </div>
              </div>
            ))}
          </div>

          <div style={{ marginTop: "30px", display: "flex", gap: "10px" }}>
            <button
              style={{ ...styles.btn, ...styles.btnSuccess }}
              onClick={handleBulkSubmit}
              disabled={loading}
            >
              {loading ? "⏳ Kaydediyor..." : "💾 Toplu Kaydet"}
            </button>
            <button style={styles.btn} onClick={() => setShowBulkModal(false)}>
              ❌ İptal
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default KPIDashboard;

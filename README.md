# 📊 İstanbul Müşteriler KPI Dashboard

Vercel için hazır React projesi - Supabase destekli KPI takip sistemi.

## 🚀 Hızlı Başlangıç (Vercel Deploy)

### 1. Proje Dosyalarını Oluşturun

Aşağıdaki dosya yapısını oluşturun:

```
kpi-dashboard/
├── package.json
├── public/
│   └── index.html
├── src/
│   ├── index.js
│   ├── KPIDashboard.js
│   └── reportWebVitals.js
├── .env
├── .env.example
├── .gitignore
├── vercel.json
└── README.md
```

### 2. Dependencies Yükleyin

```bash
npm install
```

### 3. Environment Variables Ayarlayın

`.env` dosyasında kendi Supabase bilgilerinizi güncelleyin:

```env
REACT_APP_SUPABASE_URL=your_supabase_project_url
REACT_APP_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### 4. Vercel'e Deploy Edin

#### Seçenek A: Vercel CLI ile
```bash
npm install -g vercel
vercel --prod
```

#### Seçenek B: GitHub + Vercel Dashboard ile
1. Projeyi GitHub'a push edin
2. [Vercel Dashboard](https://vercel.com/dashboard)'a gidin
3. "New Project" → GitHub repo'nuzu seçin
4. Environment variables'ları ekleyin
5. Deploy butonuna basın

## 🗄️ Supabase Database Kurulumu

Dashboard'un tam fonksiyonel olması için aşağıdaki tabloları oluşturun:

### `data_entries` tablosu:
```sql
CREATE TABLE data_entries (
  id SERIAL PRIMARY KEY,
  date DATE NOT NULL,
  employee VARCHAR(100) NOT NULL,
  team VARCHAR(100) NOT NULL,
  calls INTEGER DEFAULT 0,
  proposals INTEGER DEFAULT 0,
  online_visits INTEGER DEFAULT 0,
  physical_visits INTEGER DEFAULT 0,
  total_visits INTEGER DEFAULT 0,
  on_leave BOOLEAN DEFAULT false,
  created_at TIMESTAMP DEFAULT NOW()
);
```

### `teams` tablosu:
```sql
CREATE TABLE teams (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) UNIQUE NOT NULL,
  password VARCHAR(100) NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Örnek veri:
INSERT INTO teams (name, password) VALUES 
('İstanbul Müşteriler -1', 'team1'),
('İstanbul Müşteriler -2', 'team2'),
('İstanbul Müşteriler -3', 'team3'),
('İstanbul Müşteriler -4', 'team4');
```

### `kpi_targets` tablosu:
```sql
CREATE TABLE kpi_targets (
  id SERIAL PRIMARY KEY,
  metric_name VARCHAR(50) UNIQUE NOT NULL,
  target_value INTEGER NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Hedef değerler:
INSERT INTO kpi_targets (metric_name, target_value) VALUES 
('calls', 45),
('proposals', 5),
('online_visits', 2),
('physical_visits', 1),
('total_visits', 3);
```

### `admin_settings` tablosu:
```sql
CREATE TABLE admin_settings (
  id SERIAL PRIMARY KEY,
  setting_name VARCHAR(50) UNIQUE NOT NULL,
  setting_value VARCHAR(200) NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Admin şifresi:
INSERT INTO admin_settings (setting_name, setting_value) VALUES 
('admin_password', '1234');
```

## 🔧 Özellikler

### ✅ Tamamlanan Özellikler:
- 📊 Real-time KPI dashboard
- 👥 Çalışan performans takibi
- 📝 Tekli ve toplu veri girişi
- 🏆 Aylık performans sıralaması
- 🔐 Ekip ve admin şifre sistemi
- 📱 WhatsApp paylaşım
- 📧 Email export
- 📈 Excel export
- 🗑️ Veri silme işlemleri
- ⚙️ Admin paneli

### 🔒 Güvenlik:
- Ekip bazlı şifre koruması
- Admin paneli ayrı şifre
- Supabase RLS (Row Level Security) uyumlu
- Environment variables ile API key koruması

### 📱 Responsive:
- Mobil uyumlu tasarım
- Tablet optimizasyonu
- Desktop full-width layout

## 🛠️ Geliştirme

### Local Development:
```bash
npm start
```

### Build:
```bash
npm run build
```

### Test:
```bash
npm test
```

## 📋 Default Şifreler

**Yönetici:** `1234`

**Ekip Şifreleri:**
- İstanbul Müşteriler -1: `team1`
- İstanbul Müşteriler -2: `team2`
- İstanbul Müşteriler -3: `team3` 
- İstanbul Müşteriler -4: `team4`

> ⚠️ **Güvenlik:** Production'da mutlaka şifreleri değiştirin!

## 🔄 Vercel Environment Variables

Vercel Dashboard'da aşağıdaki environment variables'ları ekleyin:

| Variable Name | Example Value |
|---------------|---------------|
| `REACT_APP_SUPABASE_URL` | `https://xxxxx.supabase.co` |
| `REACT_APP_SUPABASE_ANON_KEY` | `eyJhbGciOiJIUzI1NiIs...` |

## 📞 Sorun Giderme

### Supabase Bağlantı Hatası:
1. `.env` dosyasındaki URL ve Key'leri kontrol edin
2. Supabase projesi aktif mi kontrol edin
3. RLS (Row Level Security) ayarlarını kontrol edin

### Vercel Deploy Hatası:
1. `package.json` dependencies'larını kontrol edin
2. Build errors için Vercel logs'ları inceleyin
3. Environment variables doğru set edilmiş mi kontrol edin

### Performance Sorunları:
1. Büyük veri setleri için pagination ekleyin
2. Database indexleri oluşturun
3. Supabase free tier limitleri kontrol edin

## 📈 Gelecek Özellikler

- [ ] Chart.js ile detaylı grafikler
- [ ] Real-time bildirimler
- [ ] PDF rapor oluşturma
- [ ] Slack entegrasyonu
- [ ] Mobile app (React Native)

## 🤝 Katkıda Bulunma

1. Fork'layın
2. Feature branch oluşturun (`git checkout -b feature/amazing-feature`)
3. Commit'leyin (`git commit -m 'Add amazing feature'`)
4. Push'layın (`git push origin feature/amazing-feature`)
5. Pull Request açın

## 📄 Lisans

Bu proje MIT lisansı altında lisanslanmıştır.

---

**🚀 Happy Coding!** 

Sorularınız için: [GitHub Issues](https://github.com/yourusername/kpi-dashboard/issues)

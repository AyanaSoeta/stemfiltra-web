"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useCallback, useRef } from "react";

// ─── 都道府県リスト ────────────────────────────────────────────────────
const PREFECTURES = [
  "北海道","青森県","岩手県","宮城県","秋田県","山形県","福島県",
  "茨城県","栃木県","群馬県","埼玉県","千葉県","東京都","神奈川県",
  "新潟県","富山県","石川県","福井県","山梨県","長野県",
  "岐阜県","静岡県","愛知県","三重県",
  "滋賀県","京都府","大阪府","兵庫県","奈良県","和歌山県",
  "鳥取県","島根県","岡山県","広島県","山口県",
  "徳島県","香川県","愛媛県","高知県",
  "福岡県","佐賀県","長崎県","熊本県","大分県","宮崎県","鹿児島県","沖縄県",
];

// ─── 価格 ─────────────────────────────────────────────────────────────
const PRICE_EX_TAX = 1_200_000;
const TAX = Math.floor(PRICE_EX_TAX * 0.1);
const PRICE_IN_TAX = PRICE_EX_TAX + TAX;
const fmt = (n: number) => n.toLocaleString("ja-JP");

// ─── 振込先情報 ───────────────────────────────────────────────────────
const BANK_INFO = {
  bankName: "三井住友銀行",
  branchName: "小石川支店",
  accountType: "普通",
  accountNumber: "3764054",
  accountHolder: "イツパンシヤダンホウジンケンコウジギヨウシエンキユウ",
};

// ─── ヤマト運輸クール宅急便 時間帯指定 ─────────────────────────────────
const YAMATO_TIME_SLOTS = [
  { value: "", label: "指定なし" },
  { value: "am", label: "午前中" },
  { value: "14-16", label: "14:00〜16:00" },
  { value: "16-18", label: "16:00〜18:00" },
  { value: "18-20", label: "18:00〜20:00" },
  { value: "19-21", label: "19:00〜21:00" },
];

/** お届け可能な日付の候補を生成（入金確認後の発送のため、最短7日後〜14日後） */
function getDeliveryDateOptions(): { value: string; label: string }[] {
  const options: { value: string; label: string }[] = [
    { value: "", label: "指定なし" },
  ];
  const today = new Date();
  const dayNames = ["日", "月", "火", "水", "木", "金", "土"];
  // 最短7日後〜21日後まで選択可能
  for (let i = 7; i <= 21; i++) {
    const d = new Date(today);
    d.setDate(d.getDate() + i);
    const y = d.getFullYear();
    const m = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");
    const dow = dayNames[d.getDay()];
    options.push({
      value: `${y}-${m}-${day}`,
      label: `${y}年${Number(m)}月${Number(day)}日（${dow}）`,
    });
  }
  return options;
}

// ─── カウンセリング希望曜日・時間帯 ──────────────────────────────────
const COUNSELING_DAYS = [
  { value: "weekday", label: "平日（月〜金）" },
  { value: "weekend", label: "土日・祝日" },
  { value: "any", label: "どちらでも可" },
];

const COUNSELING_TIMES = [
  { value: "morning", label: "午前（10:00〜12:00）" },
  { value: "afternoon", label: "午後（13:00〜17:00）" },
  { value: "evening", label: "夕方以降（17:00〜20:00）" },
  { value: "any", label: "どの時間帯でも可" },
];

// ─── フォーム型 ───────────────────────────────────────────────────────
interface F {
  lastName: string; firstName: string;
  lastNameKana: string; firstNameKana: string;
  email: string; emailConfirm: string;
  phone: string;
  zipCode: string; prefecture: string;
  city: string; address: string; building: string;
  deliveryDate: string; deliveryTime: string;
  counselingDay: string; counselingTime: string;
  notes: string;
}
type Errs = Partial<Record<keyof F | "agree", string>>;

// ─── 入力スタイル生成 ─────────────────────────────────────────────────
const inputCls = (err?: string) =>
  `w-full rounded-lg px-4 py-3 text-sm text-white placeholder:text-white/20 focus:outline-none transition-all duration-200 ${
    err
      ? "bg-red-500/5 border border-red-400/50 focus:border-red-400"
      : "bg-white/[0.06] border border-white/[0.10] focus:border-[#A8D8EA] focus:bg-white/[0.08]"
  }`;

// ─── ステップ定義 ─────────────────────────────────────────────────────
const STEPS = [
  { n: 1, label: "ご注文情報" },
  { n: 2, label: "ご確認" },
  { n: 3, label: "振込案内" },
];

// ─── メインコンポーネント ─────────────────────────────────────────────
export default function PurchasePage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [form, setForm] = useState<F>({
    lastName: "", firstName: "",
    lastNameKana: "", firstNameKana: "",
    email: "", emailConfirm: "",
    phone: "",
    zipCode: "", prefecture: "",
    city: "", address: "", building: "",
    deliveryDate: "", deliveryTime: "",
    counselingDay: "", counselingTime: "",
    notes: "",
  });
  const [agreed, setAgreed] = useState(false);
  const [errors, setErrors] = useState<Errs>({});
  const [zipLoading, setZipLoading] = useState(false);
  const [zipMsg, setZipMsg] = useState<{ type: "error" | "ok"; text: string } | null>(null);
  const [orderNumber, setOrderNumber] = useState("");
  const topRef = useRef<HTMLDivElement>(null);

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
      const { name, value } = e.target;
      setForm((prev) => ({ ...prev, [name]: value }));
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    },
    []
  );

  // 郵便番号から住所を自動補完
  const lookupZip = async () => {
    const zip = form.zipCode.replace(/[^\d]/g, "");
    if (zip.length !== 7) {
      setZipMsg({ type: "error", text: "ハイフンなし7桁の郵便番号を入力してください" });
      return;
    }
    setZipLoading(true);
    setZipMsg(null);
    try {
      const res = await fetch(
        `https://zipcloud.ibsnet.co.jp/api/search?zipcode=${zip}`
      );
      const data = await res.json();
      if (data.results?.length) {
        const r = data.results[0];
        setForm((prev) => ({
          ...prev,
          prefecture: r.address1,
          city: r.address2 + r.address3,
        }));
        setErrors((prev) => ({ ...prev, prefecture: undefined, city: undefined }));
        setZipMsg({ type: "ok", text: "住所を自動入力しました" });
      } else {
        setZipMsg({ type: "error", text: "郵便番号が見つかりませんでした" });
      }
    } catch {
      setZipMsg({ type: "error", text: "住所の取得に失敗しました。手動でご入力ください" });
    }
    setZipLoading(false);
  };

  // バリデーション（フィールド順序を保持）
  const FIELD_ORDER = [
    "lastName", "firstName", "lastNameKana", "firstNameKana",
    "email", "emailConfirm", "phone",
    "zipCode", "prefecture", "city", "address",
    "counselingDay", "counselingTime", "agree",
  ];

  const validate = (): { valid: boolean; firstErrorField: string | null } => {
    const e: Errs = {};
    if (!form.lastName) e.lastName = "姓を入力してください";
    if (!form.firstName) e.firstName = "名を入力してください";
    if (!form.lastNameKana) e.lastNameKana = "フリガナ（セイ）を入力してください";
    if (!form.firstNameKana) e.firstNameKana = "フリガナ（メイ）を入力してください";
    if (!form.email) e.email = "メールアドレスを入力してください";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      e.email = "正しいメールアドレスを入力してください";
    if (!form.emailConfirm) e.emailConfirm = "確認用メールアドレスを入力してください";
    else if (form.email !== form.emailConfirm)
      e.emailConfirm = "メールアドレスが一致しません";
    if (!form.phone) e.phone = "電話番号を入力してください";
    if (!form.zipCode) e.zipCode = "郵便番号を入力してください";
    if (!form.prefecture) e.prefecture = "都道府県を選択してください";
    if (!form.city) e.city = "市区町村を入力してください";
    if (!form.address) e.address = "番地を入力してください";
    if (!form.counselingDay) e.counselingDay = "ご希望の曜日を選択してください";
    if (!form.counselingTime) e.counselingTime = "ご希望の時間帯を選択してください";
    if (!agreed) e.agree = "同意が必要です";
    setErrors(e);
    const firstErrorField = FIELD_ORDER.find((key) => e[key as keyof typeof e]) ?? null;
    return { valid: Object.keys(e).length === 0, firstErrorField };
  };

  const scrollToFirstError = (fieldName: string) => {
    const el =
      document.querySelector<HTMLElement>(`[name="${fieldName}"]`) ??
      document.querySelector<HTMLElement>(`[data-field="${fieldName}"]`);
    el?.scrollIntoView({ behavior: "smooth", block: "center" });
  };

  const scrollToTop = () => {
    topRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  // Step 1 → Step 2 (確認画面へ)
  const handleToConfirm = (e: React.FormEvent) => {
    e.preventDefault();
    const { valid, firstErrorField } = validate();
    if (!valid) {
      if (firstErrorField) scrollToFirstError(firstErrorField);
      return;
    }
    setCurrentStep(2);
    scrollToTop();
  };

  // Step 2 → Step 1 (修正)
  const handleBackToInput = () => {
    setCurrentStep(1);
    scrollToTop();
  };

  // Step 2 → Step 3 (注文確定)
  const handleConfirmOrder = async () => {
    const now = new Date();
    const num = `SF${now.getFullYear()}${String(now.getMonth() + 1).padStart(2, "0")}${String(now.getDate()).padStart(2, "0")}-${String(Math.floor(Math.random() * 10000)).padStart(4, "0")}`;
    setOrderNumber(num);
    setCurrentStep(3);
    scrollToTop();

    // バックグラウンドでメール送信（画面遷移はブロックしない）
    try {
      await fetch("/api/order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, orderNumber: num }),
      });
    } catch {
      // メール送信失敗は画面に影響させない
    }
  };

  return (
    <div className="min-h-screen" style={{ background: "#0A0A0A" }}>
      {/* ── ヘッダー ─────────────────────────────────── */}
      <header
        className="sticky top-0 z-50 py-4 px-5"
        style={{
          background: "rgba(10,10,10,0.92)",
          backdropFilter: "blur(16px)",
          borderBottom: "1px solid rgba(255,255,255,0.06)",
        }}
      >
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <Link
            href="/"
            className="text-white/80 text-xs tracking-[0.2em] font-light hover:text-white transition-colors"
          >
            Stem Filtra Activation
          </Link>
          <div className="flex items-center gap-1.5">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#A8D8EA" strokeWidth="2">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
            </svg>
            <span className="text-white/40 text-xs">SSL暗号化通信</span>
          </div>
        </div>
      </header>

      {/* ── ステップインジケーター ─────────────────────── */}
      <div
        ref={topRef}
        className="py-5 px-5"
        style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}
      >
        <div className="max-w-5xl mx-auto">
          <ol className="flex items-center justify-center gap-0">
            {STEPS.map((s, i) => (
              <li key={s.n} className="flex items-center">
                <div className="flex items-center gap-2">
                  <div
                    className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-semibold shrink-0 ${
                      s.n < currentStep
                        ? "bg-[#A8D8EA]/20 text-[#A8D8EA]"
                        : s.n === currentStep
                        ? "bg-[#A8D8EA] text-[#0A0A0A]"
                        : "text-white/25 border border-white/15"
                    }`}
                  >
                    {s.n < currentStep ? (
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                        <path d="M20 6L9 17l-5-5" />
                      </svg>
                    ) : (
                      s.n
                    )}
                  </div>
                  <span
                    className={`text-xs hidden sm:block ${
                      s.n <= currentStep ? "text-[#A8D8EA]" : "text-white/25"
                    }`}
                  >
                    {s.label}
                  </span>
                </div>
                {i < STEPS.length - 1 && (
                  <div
                    className={`mx-3 sm:mx-5 h-px w-8 sm:w-14 ${
                      s.n < currentStep ? "bg-[#A8D8EA]/40" : "bg-white/10"
                    }`}
                  />
                )}
              </li>
            ))}
          </ol>
        </div>
      </div>

      {/* ── メインコンテンツ ──────────────────────────── */}
      <main className="max-w-5xl mx-auto px-4 sm:px-6 py-10 md:py-14">

        {/* ================ STEP 1: 入力フォーム ================ */}
        {currentStep === 1 && (
          <div className="grid md:grid-cols-[1fr_1.15fr] gap-8 lg:gap-12 items-start">
            {/* ════ 左：商品サマリー（スティッキー）════ */}
            <ProductSummary />

            {/* ════ 右：注文フォーム ════ */}
            <form onSubmit={handleToConfirm} noValidate className="space-y-5">

              {/* ── お支払い方法 ── */}
              <div
                className="rounded-2xl p-5"
                style={{
                  background: "rgba(168,216,234,0.04)",
                  border: "1px solid rgba(168,216,234,0.18)",
                }}
              >
                <div className="flex items-center gap-3 mb-3">
                  <div
                    className="w-9 h-9 rounded-full flex items-center justify-center shrink-0"
                    style={{ background: "rgba(168,216,234,0.12)" }}
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#A8D8EA" strokeWidth="1.5">
                      <rect x="2" y="4" width="20" height="16" rx="2" />
                      <path d="M2 10h20" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-[#A8D8EA] text-xs font-medium tracking-wider">お支払い方法</p>
                    <p className="text-white text-sm font-medium mt-0.5">銀行振込</p>
                  </div>
                </div>
                <p className="text-white/35 text-xs leading-relaxed pl-12">
                  ご注文確定後、振込先をご案内いたします。<br />
                  お振込み確認後、医師のカウンセリングを経て発送いたします。
                </p>
              </div>

              {/* ── Section 1: お客様情報 ── */}
              <FormCard stepNum={1} title="お客様情報">
                {/* 氏名 */}
                <div className="grid grid-cols-2 gap-3 mb-4">
                  <Field label="姓" required error={errors.lastName}>
                    <input
                      type="text" name="lastName" value={form.lastName}
                      onChange={handleChange} placeholder="山田"
                      autoComplete="family-name"
                      className={inputCls(errors.lastName)}
                      data-error={errors.lastName || undefined}
                    />
                  </Field>
                  <Field label="名" required error={errors.firstName}>
                    <input
                      type="text" name="firstName" value={form.firstName}
                      onChange={handleChange} placeholder="太郎"
                      autoComplete="given-name"
                      className={inputCls(errors.firstName)}
                      data-error={errors.firstName || undefined}
                    />
                  </Field>
                </div>

                {/* フリガナ */}
                <div className="grid grid-cols-2 gap-3 mb-4">
                  <Field label="セイ（フリガナ）" required error={errors.lastNameKana}>
                    <input
                      type="text" name="lastNameKana" value={form.lastNameKana}
                      onChange={handleChange} placeholder="ヤマダ"
                      className={inputCls(errors.lastNameKana)}
                      data-error={errors.lastNameKana || undefined}
                    />
                  </Field>
                  <Field label="メイ（フリガナ）" required error={errors.firstNameKana}>
                    <input
                      type="text" name="firstNameKana" value={form.firstNameKana}
                      onChange={handleChange} placeholder="タロウ"
                      className={inputCls(errors.firstNameKana)}
                      data-error={errors.firstNameKana || undefined}
                    />
                  </Field>
                </div>

                {/* メール */}
                <Field label="メールアドレス" required error={errors.email} className="mb-4">
                  <input
                    type="email" name="email" value={form.email}
                    onChange={handleChange} placeholder="example@email.com"
                    autoComplete="email"
                    className={inputCls(errors.email)}
                    data-error={errors.email || undefined}
                  />
                </Field>

                <Field label="メールアドレス（確認）" required error={errors.emailConfirm} className="mb-4">
                  <input
                    type="email" name="emailConfirm" value={form.emailConfirm}
                    onChange={handleChange} placeholder="example@email.com"
                    autoComplete="off"
                    className={inputCls(errors.emailConfirm)}
                    data-error={errors.emailConfirm || undefined}
                  />
                  <p className="text-white/25 text-[10px] mt-1">※ コピー&ペーストはご遠慮ください</p>
                </Field>

                {/* 電話番号 */}
                <Field label="電話番号" required error={errors.phone}>
                  <input
                    type="tel" name="phone" value={form.phone}
                    onChange={handleChange} placeholder="090-0000-0000"
                    autoComplete="tel"
                    className={inputCls(errors.phone)}
                    data-error={errors.phone || undefined}
                  />
                </Field>
              </FormCard>

              {/* ── Section 2: お届け先住所 ── */}
              <FormCard stepNum={2} title="お届け先住所">
                {/* クール冷蔵配送バッジ */}
                <div
                  className="flex items-center gap-2 rounded-lg px-3.5 py-2.5 mb-5 -mt-1"
                  style={{
                    background: "rgba(168,216,234,0.07)",
                    border: "1px solid rgba(168,216,234,0.18)",
                  }}
                >
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#A8D8EA" strokeWidth="2">
                    <line x1="12" y1="2" x2="12" y2="22" />
                    <line x1="2" y1="12" x2="22" y2="12" />
                    <line x1="4.93" y1="4.93" x2="19.07" y2="19.07" />
                    <line x1="19.07" y1="4.93" x2="4.93" y2="19.07" />
                  </svg>
                  <p className="text-[#A8D8EA]/80 text-xs">
                    本商品は品質保持のため、<span className="font-medium">クール冷蔵便</span>でお届けします
                  </p>
                </div>
                {/* 郵便番号 */}
                <Field label="郵便番号" required error={errors.zipCode} className="mb-4">
                  <div className="flex gap-2">
                    <input
                      type="text" name="zipCode" value={form.zipCode}
                      onChange={handleChange} placeholder="000-0000"
                      maxLength={8} autoComplete="postal-code"
                      className={`flex-1 ${inputCls(errors.zipCode)}`}
                      data-error={errors.zipCode || undefined}
                    />
                    <button
                      type="button"
                      onClick={lookupZip}
                      disabled={zipLoading}
                      className="shrink-0 px-4 py-3 rounded-lg text-xs font-semibold text-[#0A0A0A] transition-all duration-200 hover:opacity-85 disabled:opacity-50 active:scale-95"
                      style={{ background: "#A8D8EA" }}
                    >
                      {zipLoading ? "検索中…" : "住所を検索"}
                    </button>
                  </div>
                  {zipMsg && (
                    <p className={`text-xs mt-1.5 flex items-center gap-1 ${zipMsg.type === "ok" ? "text-[#A8D8EA]" : "text-yellow-400"}`}>
                      {zipMsg.type === "ok" && (
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                          <path d="M20 6L9 17l-5-5" />
                        </svg>
                      )}
                      {zipMsg.text}
                    </p>
                  )}
                </Field>

                {/* 都道府県 */}
                <Field label="都道府県" required error={errors.prefecture} className="mb-4">
                  <div className="relative">
                    <select
                      name="prefecture" value={form.prefecture}
                      onChange={handleChange}
                      autoComplete="address-level1"
                      className={`appearance-none ${inputCls(errors.prefecture)}`}
                      style={{ colorScheme: "dark" }}
                      data-error={errors.prefecture || undefined}
                    >
                      <option value="" className="bg-[#1A1A1A] text-white/40">
                        選択してください
                      </option>
                      {PREFECTURES.map((p) => (
                        <option key={p} value={p} className="bg-[#1A1A1A] text-white">
                          {p}
                        </option>
                      ))}
                    </select>
                    <div className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-white/30">
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M6 9l6 6 6-6" />
                      </svg>
                    </div>
                  </div>
                </Field>

                {/* 市区町村 */}
                <Field label="市区町村" required error={errors.city} className="mb-4">
                  <input
                    type="text" name="city" value={form.city}
                    onChange={handleChange} placeholder="文京区"
                    autoComplete="address-level2"
                    className={inputCls(errors.city)}
                    data-error={errors.city || undefined}
                  />
                </Field>

                {/* 番地 */}
                <Field label="番地" required error={errors.address} className="mb-4">
                  <input
                    type="text" name="address" value={form.address}
                    onChange={handleChange} placeholder="小石川1-28-3"
                    autoComplete="address-line1"
                    className={inputCls(errors.address)}
                    data-error={errors.address || undefined}
                  />
                </Field>

                {/* 建物名 */}
                <Field label="マンション・建物名・部屋番号" subLabel="任意" className="mb-4">
                  <input
                    type="text" name="building" value={form.building}
                    onChange={handleChange} placeholder="〇〇ビル 2F"
                    autoComplete="address-line2"
                    className={inputCls()}
                  />
                </Field>

                {/* 配送希望日時 */}
                <div
                  className="rounded-xl p-4 mt-5"
                  style={{
                    background: "rgba(255,255,255,0.02)",
                    border: "1px solid rgba(255,255,255,0.06)",
                  }}
                >
                  <p className="text-white/60 text-xs font-medium tracking-wider mb-1 flex items-center gap-2">
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#A8D8EA" strokeWidth="1.5">
                      <rect x="3" y="4" width="18" height="18" rx="2" />
                      <path d="M16 2v4M8 2v4M3 10h18" />
                    </svg>
                    配送希望日時
                  </p>
                  <p className="text-white/25 text-[10px] mb-4">ヤマト運輸 クール宅急便にてお届けします</p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <Field label="お届け希望日" subLabel="任意">
                      <div className="relative">
                        <select
                          name="deliveryDate" value={form.deliveryDate}
                          onChange={handleChange}
                          className={`appearance-none ${inputCls()}`}
                          style={{ colorScheme: "dark" }}
                        >
                          {getDeliveryDateOptions().map((opt) => (
                            <option key={opt.value} value={opt.value} className="bg-[#1A1A1A] text-white">
                              {opt.label}
                            </option>
                          ))}
                        </select>
                        <div className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-white/30">
                          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M6 9l6 6 6-6" />
                          </svg>
                        </div>
                      </div>
                    </Field>

                    <Field label="お届け時間帯" subLabel="任意">
                      <div className="relative">
                        <select
                          name="deliveryTime" value={form.deliveryTime}
                          onChange={handleChange}
                          className={`appearance-none ${inputCls()}`}
                          style={{ colorScheme: "dark" }}
                        >
                          {YAMATO_TIME_SLOTS.map((slot) => (
                            <option key={slot.value} value={slot.value} className="bg-[#1A1A1A] text-white">
                              {slot.label}
                            </option>
                          ))}
                        </select>
                        <div className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-white/30">
                          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M6 9l6 6 6-6" />
                          </svg>
                        </div>
                      </div>
                    </Field>
                  </div>

                  <p className="text-white/20 text-[10px] mt-3 leading-relaxed">
                    ※ お届け日はお振込み確認後の目安です。地域や天候により変動する場合があります。
                  </p>
                </div>
              </FormCard>

              {/* ── Section 3: カウンセリング希望 ── */}
              <FormCard stepNum={3} title="オンラインカウンセリング">
                <div
                  className="flex items-start gap-3 rounded-xl px-4 py-3.5 mb-5 -mt-1"
                  style={{
                    background: "rgba(168,216,234,0.06)",
                    border: "1px solid rgba(168,216,234,0.16)",
                  }}
                >
                  <div
                    className="w-8 h-8 rounded-full flex items-center justify-center shrink-0 mt-0.5"
                    style={{ background: "rgba(168,216,234,0.12)" }}
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#A8D8EA" strokeWidth="1.5">
                      <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
                      <circle cx="9" cy="7" r="4" />
                      <path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-[#A8D8EA]/90 text-xs font-medium mb-1">提携医師による使用前カウンセリング（15〜20分）</p>
                    <p className="text-white/35 text-[10px] leading-relaxed">
                      お振込み確認後、提携美容クリニックの医師とリモートで面談いたします。使用方法のご説明・体質の確認・ご不明点のご相談を行います。カウンセリング費用は商品代金に含まれます。
                    </p>
                  </div>
                </div>

                <p className="text-white/50 text-xs mb-3">ご都合のよい曜日・時間帯をお選びください</p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
                  <Field label="ご希望の曜日" required error={errors.counselingDay}>
                    <div className="relative">
                      <select
                        name="counselingDay" value={form.counselingDay}
                        onChange={handleChange}
                        className={`appearance-none ${inputCls(errors.counselingDay)}`}
                        style={{ colorScheme: "dark" }}
                        data-error={errors.counselingDay || undefined}
                      >
                        <option value="" className="bg-[#1A1A1A] text-white/40">選択してください</option>
                        {COUNSELING_DAYS.map((opt) => (
                          <option key={opt.value} value={opt.value} className="bg-[#1A1A1A] text-white">
                            {opt.label}
                          </option>
                        ))}
                      </select>
                      <div className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-white/30">
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M6 9l6 6 6-6" />
                        </svg>
                      </div>
                    </div>
                  </Field>

                  <Field label="ご希望の時間帯" required error={errors.counselingTime}>
                    <div className="relative">
                      <select
                        name="counselingTime" value={form.counselingTime}
                        onChange={handleChange}
                        className={`appearance-none ${inputCls(errors.counselingTime)}`}
                        style={{ colorScheme: "dark" }}
                        data-error={errors.counselingTime || undefined}
                      >
                        <option value="" className="bg-[#1A1A1A] text-white/40">選択してください</option>
                        {COUNSELING_TIMES.map((opt) => (
                          <option key={opt.value} value={opt.value} className="bg-[#1A1A1A] text-white">
                            {opt.label}
                          </option>
                        ))}
                      </select>
                      <div className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-white/30">
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M6 9l6 6 6-6" />
                        </svg>
                      </div>
                    </div>
                  </Field>
                </div>

                <p className="text-white/20 text-[10px] leading-relaxed">
                  ※ お振込み確認後、スタッフより具体的な日時をメールにてご連絡いたします。<br />
                  ※ カウンセリングはオンライン（ビデオ通話）で実施いたします。
                </p>
              </FormCard>

              {/* ── Section 4: 備考（任意）── */}
              <FormCard stepNum={4} title="備考・ご要望" optional>
                <textarea
                  name="notes" value={form.notes}
                  onChange={handleChange} rows={3}
                  placeholder="配送に関するご要望などがあればご記入ください"
                  className={`${inputCls()} resize-none`}
                />
              </FormCard>

              {/* ── 同意チェックボックス ── */}
              <div data-field="agree">
                <label className="flex items-start gap-3 cursor-pointer group">
                  <div className="relative mt-0.5 shrink-0">
                    <input
                      type="checkbox"
                      checked={agreed}
                      onChange={(e) => {
                        setAgreed(e.target.checked);
                        setErrors((prev) => ({ ...prev, agree: undefined }));
                      }}
                      className="sr-only"
                    />
                    <div
                      className={`w-5 h-5 rounded-[5px] flex items-center justify-center transition-all duration-200 ${
                        agreed
                          ? "bg-[#A8D8EA]"
                          : "border border-white/20 bg-white/5 group-hover:border-white/35"
                      }`}
                    >
                      {agreed && (
                        <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#0A0A0A" strokeWidth="3">
                          <path d="M20 6L9 17l-5-5" />
                        </svg>
                      )}
                    </div>
                  </div>
                  <span className="text-xs text-white/45 leading-relaxed">
                    <Link href="/privacy-policy" className="text-[#A8D8EA] hover:underline" target="_blank">
                      プライバシーポリシー
                    </Link>
                    、
                    <Link href="/terms" className="text-[#A8D8EA] hover:underline mx-0.5" target="_blank">
                      利用規約
                    </Link>
                    、および
                    <Link href="/tokushoho" className="text-[#A8D8EA] hover:underline mx-0.5" target="_blank">
                      特定商取引法に基づく表記
                    </Link>
                    に同意します
                  </span>
                </label>
                {errors.agree && (
                  <p className="text-red-400 text-xs mt-1.5 ml-8">{errors.agree}</p>
                )}
              </div>

              {/* ── 送信ボタン ── */}
              <div className="space-y-3 pb-4">
                <button
                  type="submit"
                  className="cta-btn-primary w-full py-[18px] rounded-[60px] text-[15px] font-bold tracking-widest"
                >
                  ご注文内容を確認する
                </button>
                <p className="text-center text-white/20 text-[10px] leading-relaxed">
                  次のページで入力内容をご確認いただけます
                </p>
              </div>
            </form>
          </div>
        )}

        {/* ================ STEP 2: 確認画面 ================ */}
        {currentStep === 2 && (
          <div className="max-w-2xl mx-auto space-y-6">
            <div className="text-center mb-8">
              <h1 className="text-white text-xl font-medium mb-2">ご注文内容のご確認</h1>
              <p className="text-white/40 text-sm">下記の内容でよろしければ「注文を確定する」ボタンを押してください</p>
            </div>

            {/* 商品情報 */}
            <ConfirmSection title="ご注文商品">
              <div className="flex items-center gap-4">
                <div
                  className="w-16 h-16 rounded-xl flex items-center justify-center shrink-0"
                  style={{ background: "rgba(168,216,234,0.08)" }}
                >
                  <Image
                    src="/images/product-package.png" alt="Stem Filtra Activation"
                    width={48} height={48} className="object-contain"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-white text-sm font-medium">Stem Filtra Activation</p>
                  <p className="text-white/40 text-xs mt-0.5">4本セット（1ヶ月分）× 1</p>
                </div>
                <div className="text-right shrink-0">
                  <p className="text-white text-base font-bold">¥{fmt(PRICE_IN_TAX)}</p>
                  <p className="text-white/30 text-[10px]">税込</p>
                </div>
              </div>
              <div
                className="mt-4 pt-3 space-y-1.5"
                style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}
              >
                {[
                  { label: "本体価格", val: `¥${fmt(PRICE_EX_TAX)}` },
                  { label: "消費税（10%）", val: `¥${fmt(TAX)}` },
                  { label: "送料（クール冷蔵便）", val: "無料", accent: true },
                ].map((row) => (
                  <div key={row.label} className="flex justify-between items-center">
                    <span className="text-white/40 text-xs">{row.label}</span>
                    <span className={`text-xs ${row.accent ? "text-[#A8D8EA]" : "text-white/60"}`}>
                      {row.val}
                    </span>
                  </div>
                ))}
              </div>
            </ConfirmSection>

            {/* お支払い方法 */}
            <ConfirmSection title="お支払い方法">
              <div className="flex items-center gap-3">
                <div
                  className="w-9 h-9 rounded-full flex items-center justify-center shrink-0"
                  style={{ background: "rgba(168,216,234,0.10)" }}
                >
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#A8D8EA" strokeWidth="1.5">
                    <rect x="2" y="4" width="20" height="16" rx="2" />
                    <path d="M2 10h20" />
                  </svg>
                </div>
                <div>
                  <p className="text-white text-sm font-medium">銀行振込</p>
                  <p className="text-white/35 text-xs mt-0.5">ご注文確定後に振込先をご案内いたします</p>
                </div>
              </div>
            </ConfirmSection>

            {/* お客様情報 */}
            <ConfirmSection title="お客様情報">
              <ConfirmRow label="お名前" value={`${form.lastName} ${form.firstName}（${form.lastNameKana} ${form.firstNameKana}）`} />
              <ConfirmRow label="メールアドレス" value={form.email} />
              <ConfirmRow label="電話番号" value={form.phone} />
            </ConfirmSection>

            {/* カウンセリング */}
            <ConfirmSection title="オンラインカウンセリング">
              <div className="flex items-center gap-3 mb-3">
                <div
                  className="w-9 h-9 rounded-full flex items-center justify-center shrink-0"
                  style={{ background: "rgba(168,216,234,0.10)" }}
                >
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#A8D8EA" strokeWidth="1.5">
                    <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
                    <circle cx="9" cy="7" r="4" />
                    <path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" />
                  </svg>
                </div>
                <div>
                  <p className="text-white text-sm font-medium">提携医師による使用前カウンセリング</p>
                  <p className="text-white/35 text-xs mt-0.5">オンライン（15〜20分）・費用は商品代金に含む</p>
                </div>
              </div>
              <ConfirmRow
                label="ご希望曜日"
                value={COUNSELING_DAYS.find((d) => d.value === form.counselingDay)?.label ?? form.counselingDay}
              />
              <ConfirmRow
                label="ご希望時間帯"
                value={COUNSELING_TIMES.find((t) => t.value === form.counselingTime)?.label ?? form.counselingTime}
              />
              <p className="text-white/25 text-[10px] mt-3">※ お振込み確認後、具体的な日時をメールにてご連絡いたします</p>
            </ConfirmSection>

            {/* お届け先 */}
            <ConfirmSection title="お届け先住所・配送希望">
              <ConfirmRow label="郵便番号" value={form.zipCode} />
              <ConfirmRow
                label="住所"
                value={`${form.prefecture}${form.city}${form.address}${form.building ? ` ${form.building}` : ""}`}
              />
              <ConfirmRow
                label="配送希望日"
                value={
                  form.deliveryDate
                    ? getDeliveryDateOptions().find((o) => o.value === form.deliveryDate)?.label ?? form.deliveryDate
                    : "指定なし"
                }
              />
              <ConfirmRow
                label="配送時間帯"
                value={
                  form.deliveryTime
                    ? YAMATO_TIME_SLOTS.find((s) => s.value === form.deliveryTime)?.label ?? form.deliveryTime
                    : "指定なし"
                }
              />
              <ConfirmRow label="配送方法" value="ヤマト運輸 クール宅急便" />
              {form.notes && <ConfirmRow label="備考" value={form.notes} />}
            </ConfirmSection>

            {/* ボタン */}
            <div className="space-y-3 pt-2 pb-4">
              <button
                type="button"
                onClick={handleConfirmOrder}
                className="cta-btn-primary w-full py-[18px] rounded-[60px] text-[15px] font-bold tracking-widest"
              >
                注文を確定する
              </button>
              <button
                type="button"
                onClick={handleBackToInput}
                className="w-full py-3 rounded-[60px] text-sm text-white/50 hover:text-white/70 transition-colors"
              >
                入力内容を修正する
              </button>
            </div>
          </div>
        )}

        {/* ================ STEP 3: 振込案内 ================ */}
        {currentStep === 3 && (
          <div className="max-w-2xl mx-auto space-y-6">
            {/* 完了メッセージ */}
            <div className="text-center mb-8">
              <div
                className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-5"
                style={{ background: "rgba(168,216,234,0.12)" }}
              >
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#A8D8EA" strokeWidth="2">
                  <path d="M20 6L9 17l-5-5" />
                </svg>
              </div>
              <h1 className="text-white text-xl font-medium mb-2">ご注文ありがとうございます</h1>
              <p className="text-white/40 text-sm leading-relaxed">
                ご注文内容の確認メールを <span className="text-[#A8D8EA]">{form.email}</span> に送信しました。<br />
                下記の口座にお振込みをお願いいたします。<br />
                お振込み確認後、カウンセリング日時をメールにてご連絡いたします。
              </p>
              {orderNumber && (
                <p className="text-white/25 text-xs mt-3">
                  注文番号：<span className="text-white/50 font-mono">{orderNumber}</span>
                </p>
              )}
            </div>

            {/* 振込先情報 */}
            <div
              className="rounded-2xl overflow-hidden"
              style={{
                background: "rgba(168,216,234,0.05)",
                border: "1px solid rgba(168,216,234,0.22)",
              }}
            >
              <div className="px-6 pt-5 pb-4 flex items-center gap-3">
                <div
                  className="w-9 h-9 rounded-full flex items-center justify-center shrink-0"
                  style={{ background: "rgba(168,216,234,0.15)" }}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#A8D8EA" strokeWidth="1.5">
                    <rect x="2" y="4" width="20" height="16" rx="2" />
                    <path d="M2 10h20" />
                  </svg>
                </div>
                <div>
                  <p className="text-[#A8D8EA] text-sm font-medium">お振込先</p>
                  <p className="text-white/35 text-[10px] mt-0.5">以下の口座にお振込みください</p>
                </div>
              </div>
              <div className="px-6 pb-6 space-y-0">
                <BankRow label="金融機関" value={BANK_INFO.bankName} />
                <BankRow label="支店名" value={BANK_INFO.branchName} />
                <BankRow label="口座種別" value={BANK_INFO.accountType} />
                <BankRow label="口座番号" value={BANK_INFO.accountNumber} copyable />
                <BankRow label="口座名義" value={BANK_INFO.accountHolder} copyable />
              </div>
              <div
                className="px-6 py-4"
                style={{
                  background: "rgba(168,216,234,0.04)",
                  borderTop: "1px solid rgba(168,216,234,0.12)",
                }}
              >
                <div className="flex justify-between items-center">
                  <span className="text-white/50 text-sm">お振込金額</span>
                  <span className="text-white text-xl font-bold">¥{fmt(PRICE_IN_TAX)}</span>
                </div>
              </div>
            </div>

            {/* 注意事項 */}
            <div
              className="rounded-2xl p-5 space-y-3"
              style={{
                background: "rgba(255,255,255,0.03)",
                border: "1px solid rgba(255,255,255,0.07)",
              }}
            >
              <p className="text-white/60 text-xs font-medium tracking-wider flex items-center gap-2">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10" />
                  <path d="M12 8v4M12 16h.01" />
                </svg>
                お振込みに関するご注意
              </p>
              <ul className="space-y-2.5 text-white/40 text-xs leading-relaxed">
                <li className="flex items-start gap-2">
                  <span className="text-[#A8D8EA] mt-0.5 shrink-0">●</span>
                  <span>振込手数料はお客様のご負担となります。</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#A8D8EA] mt-0.5 shrink-0">●</span>
                  <span>ご注文日から<strong className="text-white/60">7日以内</strong>にお振込みをお願いいたします。期限を過ぎますとご注文がキャンセルとなる場合がございます。</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#A8D8EA] mt-0.5 shrink-0">●</span>
                  <span>ご注文者名義と振込名義が異なる場合は、事前にお問い合わせください。</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#A8D8EA] mt-0.5 shrink-0">●</span>
                  <span>お振込み確認後、<strong className="text-white/60">1〜2営業日以内</strong>にカウンセリング日時の確定をメールにてご連絡いたします。</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#A8D8EA] mt-0.5 shrink-0">●</span>
                  <span>カウンセリング完了後、<strong className="text-white/60">3〜7営業日</strong>以内にクール冷蔵便にて発送いたします。</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#A8D8EA] mt-0.5 shrink-0">●</span>
                  <span>発送完了後、追跡番号を記載したメールをお送りいたします。</span>
                </li>
              </ul>
            </div>

            {/* 今後の流れ */}
            <div
              className="rounded-2xl p-5 space-y-3"
              style={{
                background: "rgba(168,216,234,0.03)",
                border: "1px solid rgba(168,216,234,0.12)",
              }}
            >
              <p className="text-[#A8D8EA]/80 text-xs font-medium tracking-wider flex items-center gap-2">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <rect x="3" y="4" width="18" height="18" rx="2" />
                  <path d="M16 2v4M8 2v4M3 10h18" />
                </svg>
                今後の流れ
              </p>
              <div className="space-y-3 pl-1">
                {[
                  { num: "1", text: "お振込み（7日以内にお願いいたします）", done: false },
                  { num: "2", text: "入金確認後、カウンセリング日時をメールでご連絡", done: false },
                  { num: "3", text: "提携医師とのオンラインカウンセリング（15〜20分）", done: false },
                  { num: "4", text: "カウンセリング完了後、商品を発送", done: false },
                ].map((item) => (
                  <div key={item.num} className="flex items-start gap-3">
                    <span
                      className="w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5"
                      style={{ background: "rgba(168,216,234,0.15)", color: "#A8D8EA" }}
                    >
                      {item.num}
                    </span>
                    <span className="text-white/50 text-xs leading-relaxed">{item.text}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* お問い合わせ */}
            <div
              className="rounded-2xl p-5 text-center"
              style={{
                background: "rgba(255,255,255,0.025)",
                border: "1px solid rgba(255,255,255,0.06)",
              }}
            >
              <p className="text-white/40 text-xs mb-3">ご不明な点がございましたら、お気軽にお問い合わせください</p>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 text-[#A8D8EA] text-sm hover:opacity-80 transition-opacity"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
                お問い合わせはこちら
              </Link>
            </div>

            {/* トップに戻る */}
            <div className="text-center pt-2 pb-4">
              <Link
                href="/"
                className="inline-flex items-center gap-2 text-white/30 text-sm hover:text-white/50 transition-colors"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M19 12H5M12 19l-7-7 7-7" />
                </svg>
                トップページに戻る
              </Link>
            </div>
          </div>
        )}
      </main>

      {/* ── フッター ─────────────────────────────────── */}
      <footer
        className="py-10 mt-8"
        style={{ background: "#111111", borderTop: "1px solid rgba(255,255,255,0.04)" }}
      >
        <div className="max-w-5xl mx-auto px-6 text-center">
          <nav className="flex flex-wrap justify-center gap-x-4 gap-y-2 mb-5">
            {[
              { href: "/tokushoho", label: "特定商取引法に基づく表記" },
              { href: "/privacy-policy", label: "プライバシーポリシー" },
              { href: "/terms", label: "利用規約" },
              { href: "/contact", label: "お問い合わせ" },
            ].map((link, i, arr) => (
              <span key={link.href} className="flex items-center gap-4">
                <Link
                  href={link.href}
                  className="text-white/40 text-xs hover:text-white/70 transition-colors duration-200"
                >
                  {link.label}
                </Link>
                {i < arr.length - 1 && (
                  <span className="text-white/15 text-xs">|</span>
                )}
              </span>
            ))}
          </nav>
          <p className="text-white/20 text-xs">
            © 2025 一般社団法人　健康事業支援機構. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}

// ─── 商品サマリーコンポーネント ──────────────────────────────────────────
function ProductSummary() {
  return (
    <div className="md:sticky md:top-24 space-y-4">
      {/* 商品カード */}
      <div
        className="rounded-2xl overflow-hidden"
        style={{
          background: "rgba(255,255,255,0.035)",
          border: "1px solid rgba(168,216,234,0.18)",
        }}
      >
        <div
          className="relative flex justify-center items-center py-10 px-8"
          style={{
            background:
              "radial-gradient(ellipse at 50% 60%, rgba(168,216,234,0.10) 0%, transparent 70%)",
          }}
        >
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "radial-gradient(ellipse at 50% 100%, rgba(168,216,234,0.06) 0%, transparent 60%)",
            }}
          />
          <Image
            src="/images/product-package.png"
            alt="Stem Filtra Activation"
            width={180}
            height={180}
            className="relative z-10 object-contain"
            style={{
              filter: "drop-shadow(0 0 28px rgba(168,216,234,0.30))",
            }}
          />
        </div>

        <div className="px-6 pb-6">
          <p className="text-[#A8D8EA] text-[10px] tracking-[0.25em] uppercase mb-1">
            Stem Filtra Activation
          </p>
          <h2 className="text-white text-base font-medium mb-1">幹細胞濾液賦活剤</h2>
          <p className="text-white/40 text-xs mb-5">4本セット / 1ヶ月分（1週間1本使用）</p>

          <div
            className="rounded-xl p-4 space-y-2.5"
            style={{ background: "rgba(0,0,0,0.3)" }}
          >
            {[
              { label: "本体価格", val: `¥${fmt(PRICE_EX_TAX)}` },
              { label: "消費税（10%）", val: `¥${fmt(TAX)}` },
              { label: "送料（クール冷蔵便）", val: "無料", accent: true },
            ].map((row) => (
              <div key={row.label} className="flex justify-between items-center">
                <span className="text-white/45 text-xs">{row.label}</span>
                <span className={`text-xs ${row.accent ? "text-[#A8D8EA]" : "text-white/80"}`}>
                  {row.val}
                </span>
              </div>
            ))}
            <div
              className="flex justify-between items-center pt-2.5 mt-0.5"
              style={{ borderTop: "1px solid rgba(255,255,255,0.08)" }}
            >
              <span className="text-white text-sm font-medium">合計（税込）</span>
              <span className="text-white text-lg font-bold">¥{fmt(PRICE_IN_TAX)}</span>
            </div>
          </div>

          {/* お支払い方法 */}
          <div
            className="mt-4 rounded-lg px-3.5 py-2.5 flex items-center gap-2.5"
            style={{
              background: "rgba(168,216,234,0.06)",
              border: "1px solid rgba(168,216,234,0.15)",
            }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#A8D8EA" strokeWidth="1.5">
              <rect x="2" y="4" width="20" height="16" rx="2" />
              <path d="M2 10h20" />
            </svg>
            <span className="text-white/50 text-xs">お支払い方法：<span className="text-white/80 font-medium">銀行振込</span></span>
          </div>

          {/* 同梱内容 */}
          <div className="mt-4 space-y-1.5">
            {[
              "エクソソーム濾液 4本（1ヶ月分）",
              "専用点鼻ノズル 4本",
              "使用説明書",
            ].map((item) => (
              <div key={item} className="flex items-center gap-2">
                <div className="w-1 h-1 rounded-full bg-[#A8D8EA] shrink-0" />
                <span className="text-white/40 text-xs">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* トラストバッジ */}
      <div className="grid grid-cols-2 gap-2.5">
        {[
          {
            path: "M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z",
            label: "SSL暗号化",
            sub: "安全な通信",
          },
          {
            path: "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z",
            label: "正規品保証",
            sub: "品質認定済み",
          },
          {
            path: "M12 2a2 2 0 00-2 2v1H7a2 2 0 00-2 2v11a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-3V4a2 2 0 00-2-2zM8 11h8M8 15h5",
            label: "クール冷蔵配送",
            sub: "品質を守ってお届け",
          },
          {
            path: "M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z",
            label: "専門サポート",
            sub: "購入後も対応",
          },
        ].map((b) => (
          <div
            key={b.label}
            className="rounded-xl p-3 flex items-center gap-2.5"
            style={{
              background: "rgba(255,255,255,0.025)",
              border: "1px solid rgba(255,255,255,0.07)",
            }}
          >
            <div
              className="shrink-0 w-8 h-8 rounded-full flex items-center justify-center"
              style={{ background: "rgba(168,216,234,0.10)" }}
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#A8D8EA" strokeWidth="1.5">
                <path d={b.path} />
              </svg>
            </div>
            <div>
              <p className="text-white/80 text-xs font-medium">{b.label}</p>
              <p className="text-white/35 text-[10px]">{b.sub}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── 確認画面用セクション ─────────────────────────────────────────────
function ConfirmSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div
      className="rounded-2xl p-5 md:p-6"
      style={{
        background: "rgba(255,255,255,0.03)",
        border: "1px solid rgba(255,255,255,0.07)",
      }}
    >
      <p className="text-white/50 text-xs font-medium tracking-wider mb-4">{title}</p>
      {children}
    </div>
  );
}

function ConfirmRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-start gap-4 py-2" style={{ borderBottom: "1px solid rgba(255,255,255,0.04)" }}>
      <span className="text-white/35 text-xs w-24 shrink-0 pt-0.5">{label}</span>
      <span className="text-white/80 text-sm break-all">{value}</span>
    </div>
  );
}

// ─── 振込先表示行 ─────────────────────────────────────────────────────
function BankRow({ label, value, copyable }: { label: string; value: string; copyable?: boolean }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // fallback: do nothing
    }
  };

  return (
    <div
      className="flex items-start justify-between px-0 py-3"
      style={{ borderBottom: "1px solid rgba(168,216,234,0.08)" }}
    >
      <span className="text-white/40 text-xs w-20 shrink-0 pt-0.5">{label}</span>
      <div className="flex items-start gap-2 flex-1 min-w-0 justify-end">
        <span className="text-white text-sm font-medium text-right break-all">{value}</span>
        {copyable && (
          <button
            type="button"
            onClick={handleCopy}
            className="shrink-0 px-2.5 py-1 rounded-md text-[10px] transition-all duration-200 hover:opacity-80 active:scale-95"
            style={{
              background: copied ? "rgba(168,216,234,0.2)" : "rgba(255,255,255,0.08)",
              color: copied ? "#A8D8EA" : "rgba(255,255,255,0.5)",
              border: `1px solid ${copied ? "rgba(168,216,234,0.3)" : "rgba(255,255,255,0.1)"}`,
            }}
          >
            {copied ? "コピー済" : "コピー"}
          </button>
        )}
      </div>
    </div>
  );
}

// ─── フォーム用小コンポーネント ────────────────────────────────────────
function FormCard({
  stepNum,
  title,
  optional,
  children,
}: {
  stepNum: number;
  title: string;
  optional?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div
      className="rounded-2xl p-6 md:p-7"
      style={{
        background: "rgba(255,255,255,0.03)",
        border: "1px solid rgba(255,255,255,0.07)",
      }}
    >
      <h3 className="text-white text-sm font-medium tracking-wide mb-5 flex items-center gap-3">
        <span
          className="inline-flex w-6 h-6 rounded-full items-center justify-center text-xs font-bold shrink-0"
          style={
            optional
              ? { background: "rgba(255,255,255,0.08)", color: "rgba(255,255,255,0.4)" }
              : { background: "#A8D8EA", color: "#0A0A0A" }
          }
        >
          {stepNum}
        </span>
        {title}
        {optional && (
          <span className="text-white/25 text-xs font-normal">任意</span>
        )}
      </h3>
      {children}
    </div>
  );
}

function Field({
  label,
  required,
  subLabel,
  error,
  className,
  children,
}: {
  label: string;
  required?: boolean;
  subLabel?: string;
  error?: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div className={className}>
      <label className="block text-xs text-white/45 mb-1.5">
        {label}
        {required && <span className="text-red-400 ml-0.5">*</span>}
        {subLabel && (
          <span className="text-white/25 text-[10px] ml-1">（{subLabel}）</span>
        )}
      </label>
      {children}
      {error && (
        <p className="text-red-400 text-xs mt-1.5 flex items-center gap-1">
          <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="10" />
            <path d="M12 8v4M12 16h.01" />
          </svg>
          {error}
        </p>
      )}
    </div>
  );
}

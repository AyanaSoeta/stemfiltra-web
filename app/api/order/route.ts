import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

const NOTIFY_TO = "hso.info.k@gmail.com";
const PRICE_EX_TAX = 1_200_000;
const TAX = Math.floor(PRICE_EX_TAX * 0.1);
const PRICE_IN_TAX = PRICE_EX_TAX + TAX;
const fmt = (n: number) => n.toLocaleString("ja-JP");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_APP_PASSWORD,
  },
});

interface OrderBody {
  orderNumber: string;
  lastName: string;
  firstName: string;
  lastNameKana: string;
  firstNameKana: string;
  email: string;
  phone: string;
  zipCode: string;
  prefecture: string;
  city: string;
  address: string;
  building: string;
  deliveryDate: string;
  deliveryTime: string;
  counselingDay: string;
  counselingTime: string;
  notes: string;
}

export async function POST(req: Request) {
  try {
    const body: OrderBody = await req.json();

    if (!body.lastName || !body.email || !body.orderNumber) {
      return NextResponse.json({ error: "必須項目が不足しています" }, { status: 400 });
    }

    const fullName = `${body.lastName} ${body.firstName}`;
    const fullNameKana = `${body.lastNameKana} ${body.firstNameKana}`;
    const fullAddress = `〒${body.zipCode} ${body.prefecture}${body.city}${body.address}${body.building ? " " + body.building : ""}`;

    // 管理者への通知メール
    await transporter.sendMail({
      from: `"Stem Filtra Activation" <${process.env.GMAIL_USER}>`,
      to: NOTIFY_TO,
      subject: `【新規ご注文】${body.orderNumber} - ${fullName}様`,
      text: [
        `━━━━━━━━━━━━━━━━━━━━━━━━`,
        `  新規ご注文通知`,
        `━━━━━━━━━━━━━━━━━━━━━━━━`,
        ``,
        `注文番号: ${body.orderNumber}`,
        ``,
        `【お客様情報】`,
        `お名前: ${fullName}（${fullNameKana}）`,
        `メールアドレス: ${body.email}`,
        `電話番号: ${body.phone}`,
        ``,
        `【お届け先】`,
        fullAddress,
        body.deliveryDate ? `配送希望日: ${body.deliveryDate}` : "",
        body.deliveryTime ? `配送希望時間帯: ${body.deliveryTime}` : "",
        ``,
        `【カウンセリング希望】`,
        `曜日: ${body.counselingDay}`,
        `時間帯: ${body.counselingTime}`,
        ``,
        body.notes ? `【備考】\n${body.notes}\n` : "",
        `━━━━━━━━━━━━━━━━━━━━━━━━`,
      ]
        .filter(Boolean)
        .join("\n"),
    });

    // お客様への自動返信メール
    await transporter.sendMail({
      from: `"Stem Filtra Activation" <${process.env.GMAIL_USER}>`,
      to: body.email,
      subject: `【Stem Filtra Activation】ご注文ありがとうございます（注文番号: ${body.orderNumber}）`,
      text: [
        `${fullName} 様`,
        ``,
        `この度はStem Filtra Activationをご注文いただき、`,
        `誠にありがとうございます。`,
        ``,
        `以下の内容にてご注文を承りました。`,
        ``,
        `━━━━━━━━━━━━━━━━━━━━━━━━`,
        `注文番号: ${body.orderNumber}`,
        `━━━━━━━━━━━━━━━━━━━━━━━━`,
        ``,
        `【ご注文商品】`,
        `Stem Filtra Activation　¥${fmt(PRICE_EX_TAX)}（税抜）`,
        `消費税　¥${fmt(TAX)}`,
        `──────────────────`,
        `合計　¥${fmt(PRICE_IN_TAX)}（税込）`,
        ``,
        `【お振込先】`,
        `三井住友銀行 小石川支店`,
        `普通 3764054`,
        `イツパンシヤダンホウジンケンコウジギヨウシエンキユウ`,
        ``,
        `※お振込手数料はお客様のご負担となります。`,
        `※ご注文日から7日以内にお振込みをお願いいたします。`,
        `　期限を過ぎますとご注文がキャンセルとなる場合がございます。`,
        `※ご注文者名義とお振込名義が異なる場合は、`,
        `　事前にご連絡ください。`,
        ``,
        `【お届け先】`,
        fullAddress,
        ``,
        `【今後の流れ】`,
        `1. 上記口座へお振込み（7日以内）`,
        `2. ご入金確認後、カウンセリング日時をメールでご連絡`,
        `3. 提携医師とのオンラインカウンセリング（15〜20分）`,
        `4. カウンセリング完了後、クール冷蔵便にて発送`,
        ``,
        `━━━━━━━━━━━━━━━━━━━━━━━━`,
        ``,
        `ご不明な点がございましたら、お気軽にお問い合わせください。`,
        ``,
        `──────────────────`,
        `一般社団法人 健康事業支援機構`,
        `Email: hso.info.k@gmail.com`,
        `──────────────────`,
        ``,
        `※本メールは自動送信のため、直接ご返信いただいてもお応えできない場合がございます。`,
      ].join("\n"),
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Order mail error:", error);
    return NextResponse.json({ error: "送信に失敗しました" }, { status: 500 });
  }
}

import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

const NOTIFY_TO = "hso.info.k@gmail.com, ayana.soeta@gmail.com";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_APP_PASSWORD,
  },
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, subject, message } = body;

    if (!name || !email || !subject || !message) {
      return NextResponse.json({ error: "必須項目が不足しています" }, { status: 400 });
    }

    const subjectLabels: Record<string, string> = {
      product: "商品について",
      order: "ご注文について",
      shipping: "配送について",
      return: "返品・交換について",
      other: "その他",
    };

    const subjectLabel = subjectLabels[subject] || subject;

    // 管理者への通知メール
    await transporter.sendMail({
      from: `"Stem Filtra Activation" <${process.env.GMAIL_USER}>`,
      to: NOTIFY_TO,
      subject: `【お問い合わせ】${subjectLabel} - ${name}様`,
      text: [
        `━━━━━━━━━━━━━━━━━━━━━━━━`,
        `  お問い合わせ通知`,
        `━━━━━━━━━━━━━━━━━━━━━━━━`,
        ``,
        `お名前: ${name}`,
        `メールアドレス: ${email}`,
        `お問い合わせ種別: ${subjectLabel}`,
        ``,
        `【お問い合わせ内容】`,
        message,
        ``,
        `━━━━━━━━━━━━━━━━━━━━━━━━`,
      ].join("\n"),
    });

    // お客様への自動返信メール
    await transporter.sendMail({
      from: `"Stem Filtra Activation" <${process.env.GMAIL_USER}>`,
      to: email,
      subject: `【Stem Filtra Activation】お問い合わせを受け付けました`,
      text: [
        `${name} 様`,
        ``,
        `この度はお問い合わせいただき、誠にありがとうございます。`,
        `以下の内容にてお問い合わせを承りました。`,
        ``,
        `━━━━━━━━━━━━━━━━━━━━━━━━`,
        `お問い合わせ種別: ${subjectLabel}`,
        ``,
        `【お問い合わせ内容】`,
        message,
        `━━━━━━━━━━━━━━━━━━━━━━━━`,
        ``,
        `担当スタッフが確認の上、2〜3営業日以内にご返信いたします。`,
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
    console.error("Contact mail error:", error);
    return NextResponse.json({ error: "送信に失敗しました" }, { status: 500 });
  }
}

interface InquiryNotification {
  name: string;
  contact: string;
  message: string;
}

export async function notifySlackInquiry(inquiry: InquiryNotification) {
  const webhookUrl = process.env.SLACK_WEBHOOK_URL;
  if (!webhookUrl) return;

  const digits = inquiry.contact.replace(/[^\d+]/g, "");
  const contactLink = digits ? `<tel:${digits}|${inquiry.contact}>` : inquiry.contact;

  try {
    await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        text: `:mailbox_with_mail: *새 문의가 접수되었습니다*\n*이름:* ${inquiry.name}\n*연락처:* ${contactLink}\n*내용:* ${inquiry.message}`,
      }),
    });
  } catch (err) {
    console.error("Slack 알림 전송 실패:", err);
  }
}

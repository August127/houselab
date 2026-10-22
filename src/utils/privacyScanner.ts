export interface PrivacyFinding {
  type: 'Số điện thoại' | 'Email cá nhân/công ty' | 'Số CCCD/Định danh (12 số)' | 'Số tài khoản/Số tiền cụ thể';
  match: string;
  replacement: string;
}

export function scanSensitiveText(input: string): PrivacyFinding[] {
  const findings: PrivacyFinding[] = [];

  // 1. Vietnamese phone numbers (10 digits starting with 03, 05, 07, 08, 09 or +84)
  const phoneRegex = /\b(?:\+84|0)(?:3|5|7|8|9)\d{8}\b/g;
  const phones = input.match(phoneRegex) || [];
  phones.forEach((m) => {
    findings.push({
      type: 'Số điện thoại',
      match: m,
      replacement: '[SĐT_ĐÃ_ẨN]',
    });
  });

  // 2. CCCD / 12-digit ID numbers
  const cccdRegex = /\b0\d{11}\b/g;
  const cccds = input.match(cccdRegex) || [];
  cccds.forEach((m) => {
    findings.push({
      type: 'Số CCCD/Định danh (12 số)',
      match: m,
      replacement: '[SỐ_CCCD_ĐÃ_ẨN]',
    });
  });

  // 3. Email addresses
  const emailRegex = /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}\b/g;
  const emails = input.match(emailRegex) || [];
  emails.forEach((m) => {
    findings.push({
      type: 'Email cá nhân/công ty',
      match: m,
      replacement: 'khachhang_a@congty-mau.vn',
    });
  });

  return findings;
}

export function anonymizeSensitiveText(input: string): string {
  const findings = scanSensitiveText(input);
  let output = input;
  findings.forEach((f) => {
    output = output.split(f.match).join(f.replacement);
  });
  return output;
}

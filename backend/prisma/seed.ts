import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

async function main() {
  const adminUsername = process.env.ADMIN_USERNAME;
  const adminPassword = process.env.ADMIN_PASSWORD;

  if (!adminUsername || !adminPassword) {
    throw new Error("ADMIN_USERNAME / ADMIN_PASSWORD 환경변수가 설정되어야 합니다.");
  }

  const passwordHash = await bcrypt.hash(adminPassword, 10);

  await prisma.admin.upsert({
    where: { username: adminUsername },
    update: { passwordHash },
    create: { username: adminUsername, passwordHash },
  });

  await prisma.companyInfo.upsert({
    where: { id: 1 },
    update: {},
    create: {
      id: 1,
      introText: "구천청과 소개 문구를 관리자 페이지에서 입력해주세요.",
      address: "주소를 입력해주세요.",
    },
  });

  console.log("Seed 완료: admin 계정 및 CompanyInfo 초기값 생성됨");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

import {
  Body,
  Button,
  Column,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Img,
  Link,
  Preview,
  Row,
  Section,
  Tailwind,
  Text,
} from "@react-email/components";
import * as React from "react";

interface VercelInviteUserEmailProps {
  workspaceName?: string;
  acceptUrl?: string;
  ownerName: string;
  ownerEmail: string;
  workspaceId: string;
}

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

export const InviteUserEmail = ({
  workspaceName,
  acceptUrl,
  ownerName,
  ownerEmail,
  workspaceId,
}: VercelInviteUserEmailProps) => {
  const previewText = `Join ${workspaceName}`;

  return (
    <Html>
      <Head />
      <Tailwind>
        <Body className="bg-white my-auto mx-auto font-sans px-2">
          <Preview>{previewText}</Preview>
          <Container className="border border-solid border-[#eaeaea] rounded my-[40px] mx-auto p-[20px] max-w-[465px]">
            <Section className="mt-[32px]">
              <Img
                src={`${baseUrl}/static/logo.png`}
                width="40"
                height="37"
                alt="Vercel"
                className="my-0 mx-auto"
              />
            </Section>
            <Heading className="text-black text-[24px] font-normal text-center p-0 my-[30px] mx-0">
              Join <strong>{workspaceName}</strong> on{" "}
              <strong>taskFlowX</strong>
            </Heading>
            <Text className="text-black text-[14px] leading-[24px]">
              Hello,
            </Text>
            <Text className="text-black text-[14px] leading-[24px]">
              <strong>{ownerName}</strong> (
              <Link
                href={`mailto:${ownerEmail}`}
                className="text-blue-600 no-underline"
              >
                {ownerEmail}
              </Link>
              ) has invited you to the <strong>{workspaceName}</strong> team on{" "}
              <strong>TaskFlowX</strong>.
            </Text>
            <Section className="text-center mt-[32px] mb-[32px]">
              <Button
                className="bg-[#000000] rounded text-white text-[12px] font-semibold no-underline text-center px-5 py-3"
                href={acceptUrl}
              >
                Accept Invitation
              </Button>
            </Section>
            <Text className="text-black text-[14px] leading-[24px]">
              or copy and paste this URL into your browser:{" "}
              <Link href={acceptUrl} className="text-blue-600 no-underline">
                {acceptUrl}
              </Link>
            </Text>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

export default InviteUserEmail;

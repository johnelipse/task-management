import InvitationPage from "@/components/workspace/invitation-page";

export default async function page({
  params,
}: {
  params: Promise<{ token: string }>;
}) {
  const { token } = await params;
  return (
    <div>
      <InvitationPage token={token} />
    </div>
  );
}

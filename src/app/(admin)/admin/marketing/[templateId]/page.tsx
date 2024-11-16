export default async function Page({
  params,
}: {
  params: { templateId: string };
}) {
  const { templateId } = await params;
  return <div>Page {templateId}</div>;
}

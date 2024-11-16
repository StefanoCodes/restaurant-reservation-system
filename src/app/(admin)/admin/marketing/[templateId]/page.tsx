export default async function Page({
  params,
}: {
  params: { templateId: Promise<string> };
}) {
  const templateId = await params.templateId;
  return <div>Inner Page {templateId}</div>;
}

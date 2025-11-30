import { requireSession } from "@/lib/auth-utils";

interface PageProps {
    params: Promise<{
        credentialId: string
    }>
}

const Page = async ({params}: PageProps) => {
    const {credentialId} = await params;
    await requireSession();
    return (
        <div>Credintials : {credentialId} </div>
    )
}

export default Page;
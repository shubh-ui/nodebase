import { requireSession } from "@/lib/auth-utils";

const Page = async () => {
    await requireSession()
    return (
        <div>Executions</div>
    )
}

export default Page;
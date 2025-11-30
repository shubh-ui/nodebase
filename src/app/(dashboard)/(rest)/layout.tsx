import AppHeader from "@/components/app-header";

const Layout = ({children} : {children: React.ReactNode}) => {
    return (
        <>
        <main>
            <AppHeader />
            {children}
        </main>
        </>
     
    )
}

export default Layout;
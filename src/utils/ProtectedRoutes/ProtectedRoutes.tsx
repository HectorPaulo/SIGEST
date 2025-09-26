import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import UpnSpinner from "@/components/public/Spinners/UpnSpinner/UpnSpinner";

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
            router.push("/auth/login");
        } else {
            setLoading(false);
        }
    }, [router]);

    if (loading) return <UpnSpinner />;
    return <>{children}</>;
};

export default ProtectedRoute;
import { Button } from "@/components/ui/button";
import { Kanban } from "lucide-react";
import { Poppins } from "next/font/google";
import Link from "next/link";
import { cn } from "@/lib/utils";

const textFont = Poppins({
    subsets: ["latin"],
    weight: [
        "100",
        "200",
        "300",
        "400",
        "500",
        "600",
        "700", 
        "800",    
        "900"        
    ],
});

const LandingPage = () => {
    return (
        <div className="flex items-center justify-center flex-col">
            <div className="flex items-center justify-center flex-col">
                <div className="mb-4 flex items-center border shadow-sm p-4 bg-amber-100 text-amber-700 rounded-full uppercase">
                    <Kanban className="h-6 w-6 mr-2" />
                    Kanban Task Management
                </div>
                <h1 className="text-3xl md:text-6xl text-center text-neutral-800 mb-6">
                    Organize better
                </h1>
                <div className="text-3xl md:text-6xl bg-gradient-to-r from-fuchsia-600 to-pink-600 text-white px-4 p-2 rounded-md pd-4 w-fit">
                    task ahead
                </div>
            </div>
            <div className={cn
            ("text-sm md:text-xl text-neutral-400 mt-4 max-w-xs md:max-w-2xl text-center mx-auto",
                textFont.className,
            )}>
                Collaborate, organize, manage, plan ahead. Reach productivity with Kanban Grove.
            </div>
            <Button className="mt-6" size="lg" asChild>
                <Link href="/sign-up">
                    Get Kanban for Free
                </Link>
            </Button>
        </div>
    );
};

export default LandingPage;
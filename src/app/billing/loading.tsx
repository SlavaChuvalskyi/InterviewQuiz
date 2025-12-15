import { Skeleton } from "@/components/ui/skeleton";
import { Grid } from "@/components/ui/grid";
import { CardContent } from "@/components/ui/card";

export default function Loading() {
    return (
        <div className="flex flex-col flex-1 gap-6 pt-10">
            <div className="text-center mb-10 space-y-4">
                <div className="flex justify-center">
                    <Skeleton className="h-10 w-2/3 max-w-md rounded-lg" />
                </div>
                <div className="flex justify-center">
                    <Skeleton className="h-6 w-1/3 max-w-xs rounded-md" />
                </div>
            </div>

            <Grid className="grid-cols-[repeat(auto-fit,minmax(380px,1fr))] gap-x-4 gap-y-8 justify-center place-items-center">
                {[1, 2, 3].map((i) => (
                    <CardContent key={i}>
                        <div
                            className="bg-white border-gray-200 border rounded-3xl p-8 h-[500px] min-w-[370px] max-w-[400px] flex flex-col gap-6"
                        >
                            {/* Header */}
                            <div className="space-y-4">
                                <div className="flex items-center gap-4">
                                    <Skeleton className="h-14 w-14 rounded-xl" />
                                    <Skeleton className="h-8 w-32 rounded-md" />
                                </div>
                                <Skeleton className="h-10 w-full rounded-md" />
                            </div>

                            {/* Price */}
                            <div className="p-4 bg-gray-50 rounded-2xl border border-gray-100/50">
                                <Skeleton className="h-12 w-24 rounded-md mb-1" />
                            </div>

                            {/* Features */}
                            <div className="space-y-3 flex-1">
                                <Skeleton className="h-4 w-24 rounded-md mb-2" />
                                {[1, 2, 3, 4].map((j) => (
                                    <div key={j} className="flex gap-3">
                                        <Skeleton className="h-5 w-5 rounded-full" />
                                        <Skeleton className="h-4 w-full rounded-md" />
                                    </div>
                                ))}
                            </div>

                            {/* Button */}
                            <div className="mt-auto pt-6 border-t border-gray-100">
                                <Skeleton className="h-10 w-full rounded-md" />
                            </div>
                        </div>
                    </CardContent>
                ))}
            </Grid>
        </div>
    );
}

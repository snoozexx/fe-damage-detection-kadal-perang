import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";

interface HistorySearchBarProps {
    value: string;
    onChange: (val: string) => void;
}

export const HistorySearchBar = ({ value, onChange }: HistorySearchBarProps) => (
    <div className="relative w-full md:w-72">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-500" />
        <Input 
            placeholder="Cari Kode DTC..." 
            className="pl-10 bg-zinc-900 border-zinc-800 focus-visible:ring-blue-600 text-white"
            value={value}
            onChange={(e) => onChange(e.target.value)}
        />
    </div>
);
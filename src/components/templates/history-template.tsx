import type { ReactNode } from "react";

interface HistoryTemplateProps {
    header: ReactNode;
    searchBar: ReactNode;
    content: ReactNode;
    dialog: ReactNode;
}

export const HistoryTemplate = ({ header, searchBar, content, dialog }: HistoryTemplateProps) => {
    return (
        <div className="min-h-screen bg-black text-white p-4 md:p-6 space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-500">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                {header}
                {searchBar}
            </div>
            
            {content}
            {dialog}
        </div>
    );
};
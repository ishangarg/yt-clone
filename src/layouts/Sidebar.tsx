import { Clapperboard, Home, Library, Repeat } from "lucide-react";
import { ElementType, ReactNode } from "react";
import { buttonStyles } from "../components/Button";
import { twMerge } from "tailwind-merge";
import React from "react";

export default function Sidebar(){
    return (<>
        <aside className="sticky top-0 overflow-y-auto scrollbar-hidden pb-4 flex flex-col ml-1 lg:hidden">
            <SmallSidebarItem Icon={Home} title="Home" url="/" />
            <SmallSidebarItem Icon={Repeat} title="Shorts" url="/" />
            <SmallSidebarItem Icon={Clapperboard} title="Subscription" url="/" />
            <SmallSidebarItem Icon={Library} title="Library" url="/" />

        </aside>
        <aside className="w-56 lg:sticky absolute top-0 overflow-y-auto scrollbar-hidden pb-4 flex-col gap-2 px-2 flex">
            <LargeSidebarSection>
                <LargeSidebarItem isActive Icon={Home} title="Home" url="/" />
            </LargeSidebarSection>
        </aside>
    </>
    )
}

type SmallSidebarItemProps = {
    Icon: ElementType,
    title: string,
    url: string
}

function SmallSidebarItem({Icon, title, url}:SmallSidebarItemProps){
    return <a href={url} className={ twMerge( buttonStyles({variant:"ghost"}), "py-4 px-1 flex flex-col items-center rounded-lg gap-1")}>
        <Icon className="w-6 h-6" />
        <div className="text-sm">{title}</div>
    </a>
}

type LargeSidebarProps = {
    children: ReactNode
    title?: string
    visibleItemCount?: number
}

function LargeSidebarSection({children, title, visibleItemCount=Number.POSITIVE_INFINITY}:LargeSidebarProps){
    const childrenArray = React.Children.toArray(children).flat()
    const visibleChildren = childrenArray.slice(0, visibleItemCount)

    return <div>
        {visibleChildren}
    </div>
}

type LargeSidebarItemProps = {
    Icon: ElementType,
    title: string,
    url: string,
    isActive?: boolean

}

function LargeSidebarItem({Icon, title, url, isActive=false}:LargeSidebarItemProps){
    return <a href={url} className={twMerge(buttonStyles({variant: "ghost"}), `w-full flex items-center rounded-lg gap-4 p-3 ${isActive? 'font-bold bg-neutral-100 hover:bg-secondary': undefined}`)}>
        <Icon className="w-6 h-6" />
        <div className="whitespace-nowrap overflow-hidden text-ellipsis">{title}</div>
    </a>
}
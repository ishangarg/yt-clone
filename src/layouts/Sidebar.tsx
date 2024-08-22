import { ChevronDown, ChevronUp, Clapperboard, Clock, Film, Flame, Gamepad2, History, Home, Library, Lightbulb, ListVideo, Newspaper, PlaySquare, Radio, Repeat, ShoppingBag } from "lucide-react";
import { ElementType, ReactNode, useState } from "react";
import { Button, buttonStyles } from "../components/Button";
import { twMerge } from "tailwind-merge";
import React from "react";
import { playlists, subscriptions } from "../data/sidebar";
import { useSidebarContext } from "../context/SidebarContext";

export default function Sidebar(){

    const {isLargeOpen, isSmallOpen} = useSidebarContext()

    return (<>
        <aside className={`sticky top-0 overflow-y-auto scrollbar-hidden pb-4 flex flex-col ml-1 ${isLargeOpen ? 
            "lg:hidden" : "lg:flex"
        } `}>
            <SmallSidebarItem Icon={Home} title="Home" url="/" />
            <SmallSidebarItem Icon={Repeat} title="Shorts" url="/" />
            <SmallSidebarItem Icon={Clapperboard} title="Subscription" url="/" />
            <SmallSidebarItem Icon={Library} title="Library" url="/" />

        </aside>
        <aside className={`w-56 lg:sticky absolute top-0 overflow-y-auto scrollbar-hidden pb-4 flex-col gap-2 px-2
            ${isLargeOpen ? "lg:flex" : "lg:hidden"} ${isSmallOpen ? "flex z-[999] bg-white max-h-screen":"hidden"} 
            `}>
            <LargeSidebarSection visibleItemCount={2}>
                <LargeSidebarItem isActive IconOrImgUrl={Home} title="Home" url="/" />
                <LargeSidebarItem IconOrImgUrl={Clapperboard} title="Subscriptions" url="/subscriptions" />
            </LargeSidebarSection>
            <hr />
            <LargeSidebarSection visibleItemCount={5}>
                <LargeSidebarItem IconOrImgUrl={Library} title="Library" url="/subscriptions" />
                <LargeSidebarItem IconOrImgUrl={History} title="History" url="/subscriptions" />
                <LargeSidebarItem IconOrImgUrl={PlaySquare} title="Your Videos" url="/subscriptions" />
                <LargeSidebarItem IconOrImgUrl={Clock} title="Watch Later" url="/subscriptions" />

                {playlists.map(playlist => (
                    <LargeSidebarItem 
                    key={playlist.id}
                    IconOrImgUrl={ListVideo} 
                    title={playlist.name} 
                    url={`playlist?list=${playlist.id}`} />

                ))}

            </LargeSidebarSection>
            <hr />
            <LargeSidebarSection title="Subscription">
                {subscriptions.map(subscription => (
                    <LargeSidebarItem 
                    key={subscription.id}
                    IconOrImgUrl={subscription.imgUrl} 
                    title={subscription.channelName} 
                    url={`/@${subscription.id}`} />
                ))}
            </LargeSidebarSection>
            <hr />

            <LargeSidebarSection title="Explore">
                <LargeSidebarItem IconOrImgUrl={Flame} title="Trending" url="/subscriptions" />
                <LargeSidebarItem IconOrImgUrl={ShoppingBag} title="Shopping" url="/subscriptions" />
                <LargeSidebarItem IconOrImgUrl={Film} title="Movies and TV" url="/subscriptions" />
                <LargeSidebarItem IconOrImgUrl={Radio} title="Live" url="/subscriptions" />
                <LargeSidebarItem IconOrImgUrl={Gamepad2} title="Gaming" url="/subscriptions" />
                <LargeSidebarItem IconOrImgUrl={Newspaper} title="News" url="/subscriptions" />
                <LargeSidebarItem IconOrImgUrl={Lightbulb} title="Learning" url="/subscriptions" />




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
    const [isExpanded, setIsExpanded] = useState(false)
    const childrenArray = React.Children.toArray(children).flat()
    const showExpandButton = childrenArray.length > visibleItemCount

    const visibleChildren = isExpanded ? childrenArray : childrenArray.slice(0, visibleItemCount)

    const ButtonIcon = isExpanded ? ChevronUp : ChevronDown
    
    return <div>
        {title && <div className="ml-4 mt-2 text-lg mb-1">{title}</div>}
        {visibleChildren}
        {showExpandButton && 
            <Button variant="ghost" className="w-full flex items-center rounded-lg gap-4 p-3"
            onClick={() => setIsExpanded(e => !e)}>
                <ButtonIcon  className="w-6 h-6"/>
                <div>{isExpanded ? "Show Less" : "Show More"}</div>
            </Button>
        }
    </div>
}

type LargeSidebarItemProps = {
    IconOrImgUrl: ElementType | string,
    title: string,
    url: string,
    isActive?: boolean

}

function LargeSidebarItem({IconOrImgUrl, title, url, isActive=false}:LargeSidebarItemProps){
    return <a href={url} className={twMerge(buttonStyles({variant: "ghost"}), `w-full flex items-center rounded-lg gap-4 p-3 ${isActive? 'font-bold bg-neutral-100 hover:bg-secondary': undefined}`)}>
        {typeof IconOrImgUrl === "string" ? (<img src={IconOrImgUrl} className="w-6 h-6 rounded-full" />) : ( <IconOrImgUrl className="w-6 h-6" /> )}
        <div className="whitespace-nowrap overflow-hidden text-ellipsis">{title}</div>
    </a>
}
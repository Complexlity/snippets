import { Link } from "wouter"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Code,
  Monitor,
  Bot,
  GitFork,
  AtSign,
  Package,
  Settings,
  Link as LinkIcon,
  Copy,
  Hash,
  Clock,
} from "lucide-react"
import { GitHubLogoIcon } from "@radix-ui/react-icons"
import { cn } from "@/lib/utils"
import { useCurrentSnippet } from "@/hooks/use-current-snippet"

export default function ViewSnippetSidebar({
  className,
}: { className?: string }) {
  const { snippet } = useCurrentSnippet()
  return (
    <div
      className={cn(
        "w-64 min-h-[calc(100vh-120px)] bg-gray-100 text-gray-700 flex flex-col",
        className,
      )}
    >
      <nav className="overflow-y-auto">
        <ul className="p-2 space-y-2">
          {[
            {
              icon: <Code className="w-5 h-5" />,
              label: "Edit Code",
              href: `/editor?snippet_id=${snippet?.snippet_id}`,
            },
            {
              icon: <Bot className="w-5 h-5" />,
              label: "Edit with AI",
              badge: "AI",
            },
            // {
            //   icon: <GitHubLogoIcon className="w-5 h-5" />,
            //   label: "Github",
            // },
            { icon: <GitFork className="w-5 h-5" />, label: "Forks" },
            { icon: <AtSign className="w-5 h-5" />, label: "References" },
            { icon: <Package className="w-5 h-5" />, label: "Dependencies" },
            { icon: <Clock className="w-5 h-5" />, label: "Versions" },
            // { icon: <Settings className="w-5 h-5" />, label: "Settings" },
          ].map((item, index) => (
            <li key={index}>
              <Link
                href={item.href ?? "#"}
                className="flex items-center gap-3 px-2 py-1.5 hover:bg-gray-200 rounded-md"
              >
                {item.icon}
                <span className="text-sm">{item.label}</span>
                {item.badge && (
                  <span className="ml-auto bg-blue-500 text-white text-xs px-1.5 py-0.5 rounded">
                    {item.badge}
                  </span>
                )}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      <div className="p-4 border-t border-gray-200 space-y-4">
        <div className="space-y-1">
          <div className="text-xs font-medium">Copy embed code</div>
          <div className="text-[0.5em] p-2 rounded-sm bg-blue-50 border border-blue-200 cursor-pointer font-mono whitespace-nowrap overflow-hidden text-ellipsis">
            {`<iframe src="https://snippets.tscircuit.com/embed/seveibar/circuitmodule" width="100%" height="100%"></iframe>`}
          </div>
        </div>
        <div className="space-y-1">
          <div className="text-xs font-medium">Copy import code</div>
          <div className="text-[0.5em] p-2 rounded-sm bg-blue-50 border border-blue-200 cursor-pointer font-mono whitespace-nowrap overflow-hidden text-ellipsis">
            import CircuitModule from "@tsci/seveibar.circuitmodule"
          </div>
        </div>
        <div className="space-y-1">
          <div className="text-xs font-medium">Copy install command</div>
          <div className="text-[0.5em] p-2 rounded-sm bg-blue-50 border border-blue-200 cursor-pointer font-mono whitespace-nowrap overflow-hidden text-ellipsis">
            tsci add @tsci/{snippet?.owner_name}.{snippet?.snippet_name}
          </div>
        </div>
      </div>
    </div>
  )
}

import {
  Award,
  BadgeCheck,
  Banknote,
  BookOpen,
  BrainCircuit,
  Briefcase,
  Building,
  Building2,
  Calculator,
  Camera,
  ChartBar,
  ChefHat,
  CircuitBoard,
  Clipboard,
  Cloud,
  Code,
  Code2,
  Coins,
  Cpu,
  CreditCard,
  Database,
  FileText,
  Flame,
  Gamepad2,
  GraduationCap,
  Hammer,
  HandCoins,
  Headphones,
  Heart,
  HeartPulse,
  Home,
  Hotel,
  Languages,
  Laptop,
  Lightbulb,
  LineChart,
  LucideIcon,
  Mail,
  Megaphone,
  Mic,
  Microscope,
  Network,
  Palette,
  PenTool,
  Phone,
  PieChart,
  Plane,
  Plug,
  Presentation,
  Rocket,
  Scale,
  Search,
  Server,
  Settings,
  Shield,
  ShoppingBag,
  ShoppingCart,
  Sparkles,
  Stethoscope,
  Store,
  Target,
  TrendingUp,
  Truck,
  Users,
  Video,
  Wallet,
  Wrench,
  Zap,
} from "lucide-react";

const IconRegistry: {
  name: string;
  icon: LucideIcon;
  category: string;
  color: string;
}[] = [
  // Technology & Software
  { name: "Code", icon: Code, category: "Technology", color: "bg-blue-500" },
  { name: "Code2", icon: Code2, category: "Technology", color: "bg-blue-500" },
  {
    name: "Laptop",
    icon: Laptop,
    category: "Technology",
    color: "bg-blue-500",
  },
  {
    name: "BrainCircuit",
    icon: BrainCircuit,
    category: "Technology",
    color: "bg-purple-500",
  },
  {
    name: "Database",
    icon: Database,
    category: "Technology",
    color: "bg-blue-500",
  },
  {
    name: "Server",
    icon: Server,
    category: "Technology",
    color: "bg-blue-500",
  },
  { name: "Cloud", icon: Cloud, category: "Technology", color: "bg-sky-500" },
  { name: "Cpu", icon: Cpu, category: "Technology", color: "bg-purple-500" },
  {
    name: "CircuitBoard",
    icon: CircuitBoard,
    category: "Technology",
    color: "bg-indigo-500",
  },
  {
    name: "Network",
    icon: Network,
    category: "Technology",
    color: "bg-blue-500",
  },
  { name: "Zap", icon: Zap, category: "Technology", color: "bg-yellow-500" },
  { name: "Plug", icon: Plug, category: "Technology", color: "bg-blue-500" },
  {
    name: "Settings",
    icon: Settings,
    category: "Technology",
    color: "bg-slate-500",
  },

  // Security & Protection
  { name: "Shield", icon: Shield, category: "Security", color: "bg-green-500" },
  {
    name: "BadgeCheck",
    icon: BadgeCheck,
    category: "Security",
    color: "bg-green-500",
  },

  // Design & Creative
  { name: "Palette", icon: Palette, category: "Design", color: "bg-pink-500" },
  {
    name: "PenTool",
    icon: PenTool,
    category: "Design",
    color: "bg-purple-500",
  },
  { name: "Camera", icon: Camera, category: "Design", color: "bg-pink-500" },
  { name: "Video", icon: Video, category: "Design", color: "bg-rose-500" },
  {
    name: "Sparkles",
    icon: Sparkles,
    category: "Design",
    color: "bg-fuchsia-500",
  },

  // Healthcare & Medical
  { name: "Heart", icon: Heart, category: "Healthcare", color: "bg-red-500" },
  {
    name: "HeartPulse",
    icon: HeartPulse,
    category: "Healthcare",
    color: "bg-red-500",
  },
  {
    name: "Stethoscope",
    icon: Stethoscope,
    category: "Healthcare",
    color: "bg-red-500",
  },
  {
    name: "Microscope",
    icon: Microscope,
    category: "Healthcare",
    color: "bg-teal-500",
  },

  // Education & Training
  {
    name: "GraduationCap",
    icon: GraduationCap,
    category: "Education",
    color: "bg-indigo-500",
  },
  {
    name: "BookOpen",
    icon: BookOpen,
    category: "Education",
    color: "bg-indigo-500",
  },
  { name: "Award", icon: Award, category: "Education", color: "bg-amber-500" },
  {
    name: "Presentation",
    icon: Presentation,
    category: "Education",
    color: "bg-indigo-500",
  },

  // Business & Finance
  {
    name: "Briefcase",
    icon: Briefcase,
    category: "Business",
    color: "bg-emerald-500",
  },
  {
    name: "Building",
    icon: Building,
    category: "Business",
    color: "bg-slate-500",
  },
  {
    name: "Building2",
    icon: Building2,
    category: "Business",
    color: "bg-slate-500",
  },
  {
    name: "TrendingUp",
    icon: TrendingUp,
    category: "Business",
    color: "bg-green-500",
  },
  {
    name: "LineChart",
    icon: LineChart,
    category: "Business",
    color: "bg-emerald-500",
  },
  {
    name: "ChartBar",
    icon: ChartBar,
    category: "Business",
    color: "bg-emerald-500",
  },
  {
    name: "PieChart",
    icon: PieChart,
    category: "Business",
    color: "bg-emerald-500",
  },
  {
    name: "Banknote",
    icon: Banknote,
    category: "Business",
    color: "bg-green-500",
  },
  { name: "Coins", icon: Coins, category: "Business", color: "bg-amber-500" },
  {
    name: "Wallet",
    icon: Wallet,
    category: "Business",
    color: "bg-emerald-500",
  },
  {
    name: "CreditCard",
    icon: CreditCard,
    category: "Business",
    color: "bg-slate-500",
  },
  {
    name: "HandCoins",
    icon: HandCoins,
    category: "Business",
    color: "bg-green-500",
  },
  {
    name: "Calculator",
    icon: Calculator,
    category: "Business",
    color: "bg-slate-500",
  },
  { name: "Scale", icon: Scale, category: "Business", color: "bg-slate-500" },

  // Sales & Marketing
  {
    name: "ShoppingCart",
    icon: ShoppingCart,
    category: "Sales",
    color: "bg-orange-500",
  },
  {
    name: "ShoppingBag",
    icon: ShoppingBag,
    category: "Sales",
    color: "bg-orange-500",
  },
  { name: "Store", icon: Store, category: "Sales", color: "bg-orange-500" },
  {
    name: "Megaphone",
    icon: Megaphone,
    category: "Sales",
    color: "bg-red-500",
  },
  { name: "Target", icon: Target, category: "Sales", color: "bg-red-500" },
  { name: "Rocket", icon: Rocket, category: "Sales", color: "bg-purple-500" },
  { name: "Flame", icon: Flame, category: "Sales", color: "bg-orange-500" },

  // Communication & Support
  {
    name: "Users",
    icon: Users,
    category: "Communication",
    color: "bg-cyan-500",
  },
  { name: "Mail", icon: Mail, category: "Communication", color: "bg-blue-500" },
  {
    name: "Phone",
    icon: Phone,
    category: "Communication",
    color: "bg-green-500",
  },
  {
    name: "Headphones",
    icon: Headphones,
    category: "Communication",
    color: "bg-cyan-500",
  },
  { name: "Mic", icon: Mic, category: "Communication", color: "bg-purple-500" },
  {
    name: "Languages",
    icon: Languages,
    category: "Communication",
    color: "bg-indigo-500",
  },

  // Operations & Logistics
  { name: "Truck", icon: Truck, category: "Operations", color: "bg-slate-500" },
  { name: "Plane", icon: Plane, category: "Operations", color: "bg-sky-500" },
  {
    name: "Clipboard",
    icon: Clipboard,
    category: "Operations",
    color: "bg-slate-500",
  },
  {
    name: "FileText",
    icon: FileText,
    category: "Operations",
    color: "bg-slate-500",
  },

  // Hospitality & Services
  { name: "Hotel", icon: Hotel, category: "Hospitality", color: "bg-rose-500" },
  {
    name: "ChefHat",
    icon: ChefHat,
    category: "Hospitality",
    color: "bg-orange-500",
  },
  { name: "Home", icon: Home, category: "Hospitality", color: "bg-amber-500" },

  // Engineering & Construction
  {
    name: "Hammer",
    icon: Hammer,
    category: "Engineering",
    color: "bg-amber-500",
  },
  {
    name: "Wrench",
    icon: Wrench,
    category: "Engineering",
    color: "bg-amber-500",
  },

  // Research & Analysis
  { name: "Search", icon: Search, category: "Research", color: "bg-teal-500" },
  {
    name: "Lightbulb",
    icon: Lightbulb,
    category: "Research",
    color: "bg-yellow-500",
  },

  // Entertainment & Gaming
  {
    name: "Gamepad2",
    icon: Gamepad2,
    category: "Entertainment",
    color: "bg-purple-500",
  },
];

export default IconRegistry;

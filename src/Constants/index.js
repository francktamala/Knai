import { Light } from '@mui/icons-material';
import AnalyticsIcon from '@mui/icons-material/Analytics';
import QuizIcon from '@mui/icons-material/Quiz';


const COLORS = {
    Primary: "#077187",
    Secondary: "#A2E8DD",
    Accent: "#E62258",
    SecondaryAccent: "#FFFC31",
    Background: "#CDEDF6",
    LightGrey: "#CCC",
    Grey: "#464646"
}

const NAVIGATION = [
    {
        label: "Analytics",
        icon: AnalyticsIcon,
        path: "/dashboard"
    },
    {
        label: "Quizzes",
        icon: QuizIcon,
        path: "/dashboard/quizzes"
    },
]

export {COLORS, NAVIGATION}
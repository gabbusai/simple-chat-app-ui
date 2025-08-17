
import { SyncLoader } from 'react-spinners'


type LoadingScreenProps = {
    message?: string;
    size?: number;
    color?: string;
    bgColor?: string;
}

function LoadingScreen({ message, size, color, bgColor }: LoadingScreenProps) {
    return (
        <div className={`flex items-center justify-center h-full`}
            style={{ backgroundColor: bgColor || 'rgba(255, 255, 255, 1)' }}>
        <SyncLoader
            color={color || "#ffffff"}
            margin={10}
            size={size || 45}
        />
        </div>
    )
}

export default LoadingScreen

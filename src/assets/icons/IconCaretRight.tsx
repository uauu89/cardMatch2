type IconProps = React.SVGProps<SVGSVGElement> & {
  size?: number;
  color?: string;
};

const IconCaretRight = ({size, color = "currentColor", ...props}: IconProps)=>{
    return(
        <svg
            width={size}
            height={size}
            viewBox="0 0 60 60"
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
        >
            <path d="M46.5609 26.2595C48.6271 28.5039 48.4392 32.0572 46.1852 34.3016L22.1429 58.2404C20.4524 59.9236 17.8228 60.4846 15.5688 59.5495C13.3148 58.6143 12 56.3701 12 53.9389V6.06114C12 3.62985 13.3148 1.38559 15.5688 0.450476C17.8228 -0.484637 20.4524 0.0764295 22.1429 1.75963L46.1852 25.6984L46.5609 26.2595Z" fill={color}/>
        </svg>
    )
}

export default IconCaretRight;


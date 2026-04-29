type IconProps = React.SVGProps<SVGSVGElement> & {
  size?: number | string;
  color?: string;
};

const IconXmark = ({size = "1em", color = "currentColor", ...props} : IconProps)=>{


    return (
        <svg
            width={size}
            height={size}
            viewBox="0 0 50 50"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
                <path d="M8 8L42 42" stroke={color} strokeWidth="8" strokeLinecap="round"/>
                <path d="M8 42L42 8" stroke={color} strokeWidth="8" strokeLinecap="round"/>
        </svg>
    )
}

export default IconXmark;
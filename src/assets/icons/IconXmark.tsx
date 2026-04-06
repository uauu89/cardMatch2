type IconProps = React.SVGProps<SVGSVGElement> & {
  size?: number;
  color?: string;
};

const IconXmark = ({size, color = "currentColor", ...props} : IconProps)=>{


    return (
        <svg
            width={size}
            height={size}
            viewBox="0 0 124 124"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
                <path d="M12 12L112 112" stroke={color} strokeWidth={size} strokeLinecap="round"/>
                <path d="M12 112L112 12" stroke={color} strokeWidth={size} strokeLinecap="round"/>
        </svg>
    )
}

export default IconXmark;
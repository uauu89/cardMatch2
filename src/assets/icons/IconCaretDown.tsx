type IconProps = React.SVGProps<SVGSVGElement> & {
  size?: number;
  color?: string;
};

const IconCaretDown = ({size, color = "currentColor", ...props}: IconProps)=>{
    return(
        <svg
            width={size}
            height={size}
            viewBox="0 0 60 60"
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
        >
            <path d="M50.3431 15H9.65685C6.09324 15 4.30857 19.3086 6.82843 21.8284L27.1716 42.1716C28.7337 43.7337 31.2663 43.7337 32.8284 42.1716L53.1716 21.8284C55.6914 19.3086 53.9068 15 50.3431 15Z" fill={color}/>
        </svg>
    )
}

export default IconCaretDown;
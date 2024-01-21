
const StatusBadge = ({status, style}) => {
    const badgeStyles = (color) => {
        return {
            ...style,
            fontSize: 12,
            display: 'inline-block',
            top: 15,
            padding: 5,
            whiteSpace: 'nowrap',
            lineHeight: 1,
            background: color,
            color: "white",
            borderRadius: '10px',
            right: 15
        }
    }
    switch (status) {
        case "NEW":
            return (
                <div style={badgeStyles('#e55733')}>
                    Нова заявка
                </div>
            )
        case "PAUSED":
            return (
                <div
                    style={badgeStyles('#fbbd23')}
                >
                    Виконання призупинено
                </div>
            )
        case "IN_ORDER":
            return (
                <div
                    style={badgeStyles('#abcc38')}
                >
                    В черзі на виконання
                </div>
            )
        case "REJECTED":
            return (
                <div
                    style={badgeStyles('#f87272')}
                >
                    Анульовано
                </div>
            )
        case "DONE":
            return (
                <div
                    style={badgeStyles('#36d399')}
                >
                    Виконано
                </div>
            )
        case "AWAIT_MEASURE":
            return (
                <div
                    style={badgeStyles('#5392e7')}
                >
                    В очікуванні замірів
                </div>
            )
        case "IN_WORK":
            return (
                <div
                    style={badgeStyles('#3abff8')}
                >
                    В роботі
                </div>
            )
        default:
            return null;
    }
};

export default StatusBadge;
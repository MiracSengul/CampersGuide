export default function StarRating({ rating }) {
    return <div>{"⭐".repeat(Math.round(rating || 0))}</div>;
}
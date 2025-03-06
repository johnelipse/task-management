import { cn } from "@/lib/utils";
import Marquee from "../magicui/marquee";
import { Member } from "@prisma/client";

// const reviews = [
//   {
//     name: "Jack",
//     username: "@jack",
//     body: "I've never seen anything like this before. It's amazing. I love it.",
//     img: "https://avatar.vercel.sh/jack",
//   },
//   {
//     name: "Jill",
//     username: "@jill",
//     body: "I don't know what to say. I'm speechless. This is amazing.",
//     img: "https://avatar.vercel.sh/jill",
//   },
//   {
//     name: "John",
//     username: "@john",
//     body: "I'm at a loss for words. This is amazing. I love it.",
//     img: "https://avatar.vercel.sh/john",
//   },
//   {
//     name: "Jane",
//     username: "@jane",
//     body: "I'm at a loss for words. This is amazing. I love it.",
//     img: "https://avatar.vercel.sh/jane",
//   },
//   {
//     name: "Jenny",
//     username: "@jenny",
//     body: "I'm at a loss for words. This is amazing. I love it.",
//     img: "https://avatar.vercel.sh/jenny",
//   },
//   {
//     name: "James",
//     username: "@james",
//     body: "I'm at a loss for words. This is amazing. I love it.",
//     img: "https://avatar.vercel.sh/james",
//   },
// ];

// const firstRow = reviews.slice(0, reviews.length / 2);
// const secondRow = reviews.slice(reviews.length / 2);

const ReviewCard = ({ member }: { member: Member }) => {
  return (
    <figure
      className={cn(
        "relative h-full w-64 cursor-pointer overflow-hidden rounded-xl border py-2 px-3",
        "border-gray-50/[.1] bg-gray-50/[.10] hover:bg-gray-50/[.15]"
      )}
    >
      <div className="flex flex-row items-center gap-2">
        <img
          className="rounded-full w-8 h-8 object-cover"
          width="32"
          height="32"
          alt={member.fullName}
          src={member.image as string}
        />
        <div className="flex flex-col">
          <figcaption className="text-sm font-medium text-white">
            {member.fullName}
          </figcaption>
          <p className="text-xs  font-medium text-slate-300">{member.email}</p>
        </div>
      </div>
      <blockquote className="mt-2 text-sm text-slate-300">
        {member.description}
      </blockquote>
    </figure>
  );
};

export function MembersMarque({ members }: { members: Member[] }) {
  return (
    <div className="">
      <Marquee pauseOnHover className="[--duration:40s]">
        {members.map((member) => (
          <ReviewCard key={member.id} member={member} />
        ))}
      </Marquee>
    </div>
  );
}

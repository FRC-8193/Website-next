import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { RocketIcon, InfoIcon, ExternalLinkIcon } from "lucide-react";

export default function HomePage() {
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="mb-16 text-center">
        <h1 className="mb-4 text-5xl font-bold tracking-tight text-white sm:text-6xl">
          Steel Stingers
        </h1>
        <p className="mx-auto mb-8 max-w-2xl text-xl text-zinc-400">
          FRC Team 8193 from New Lothrop building robots and engineering the
          future.
        </p>
        <Button size="lg">Learn More</Button>
      </div>

      <ul className="mb-16 grid grid-cols-1 gap-6 md:grid-cols-3">
        <li>
          <Card>
            <CardHeader>
              <RocketIcon className="mb-2 text-white" />
              <CardTitle>Our Mission</CardTitle>
              <CardDescription>
                Building the next generation of engineers
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p>
                Our team focuses on innovation, teamwork, and technical
                excellence in the FIRST Robotics Competition.
              </p>
            </CardContent>
            <CardFooter>
              <Button variant="secondary" size="sm">
                Read More
              </Button>
            </CardFooter>
          </Card>
        </li>

        <li>
          <Card>
            <CardHeader>
              <InfoIcon className="mb-2 text-white" />
              <CardTitle>About Us</CardTitle>
              <CardDescription>Meet the team behind the robots</CardDescription>
            </CardHeader>
            <CardContent>
              <p>
                We are a diverse group of students and mentors passionate about
                science, technology, and engineering.
              </p>
            </CardContent>
            <CardFooter>
              <Button variant="secondary" size="sm">
                Team Members
              </Button>
            </CardFooter>
          </Card>
        </li>

        <li>
          <Card>
            <CardHeader>
              <ExternalLinkIcon className="mb-2 text-white" />
              <CardTitle>Get Involved</CardTitle>
              <CardDescription>Join us in our journey</CardDescription>
            </CardHeader>
            <CardContent>
              <p>
                Whether you&apos;re a student, mentor, or sponsor, there are
                many ways to be part of our robotics family.
              </p>
            </CardContent>
            <CardFooter>
              <Button variant="secondary" size="sm">
                Contact Us
              </Button>
            </CardFooter>
          </Card>
        </li>
      </ul>
    </div>
  );
}

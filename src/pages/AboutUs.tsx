import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Instagram, Phone, Mail } from 'lucide-react';

export default function AboutUs() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="text-center mb-8 animate-fade-in-up">
        <h1 className="text-4xl md:text-5xl font-bold text-gradient mb-4">
          About Us
        </h1>
        <p className="text-lg text-muted-foreground">
          Meet the team behind Tic Tac Toe Master
        </p>
      </div>

      {/* Main Story */}
      <Card className="mb-8 animate-fade-in-scale">
        <CardHeader>
          <CardTitle className="text-2xl text-center">Our Story</CardTitle>
        </CardHeader>
        <CardContent className="prose prose-lg max-w-none text-foreground">
          <p className="text-lg leading-relaxed mb-6">
            <strong>Souhail Fihri Fassi</strong> envisioned the idea for this project, and the application was carefully developed by the group known as <strong>Dev El Fassi</strong>. Our mission is to create an entertaining, intelligent, and user-friendly experience that blends classic gameplay with modern design.
          </p>
          
          <p className="text-lg leading-relaxed mb-6">
            With a passion for innovation and quality, we strive to deliver apps that stand out for their creativity and smooth performance. We believe that even the simplest games can be elevated through thoughtful design and cutting-edge technology.
          </p>

          <p className="text-lg leading-relaxed">
            Our team combines expertise in artificial intelligence, user experience design, and modern web development to create games that are not only fun to play but also technically impressive. Every detail, from the AI algorithms to the user interface animations, has been crafted with care and precision.
          </p>
        </CardContent>
      </Card>

      {/* Team Highlights */}
      <div className="grid md:grid-cols-2 gap-6 mb-8">
        <Card className="animate-fade-in-scale">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              💡 Vision
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              To revolutionize classic games through modern technology and intelligent design, making them more engaging and accessible to everyone.
            </p>
          </CardContent>
        </Card>

        <Card className="animate-fade-in-scale">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              🎯 Mission
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              Creating entertaining, intelligent, and user-friendly experiences that blend timeless gameplay with cutting-edge technology and design.
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Contact Information */}
      <Card className="animate-fade-in-up">
        <CardHeader>
          <CardTitle className="text-center">Get in Touch</CardTitle>
          <CardDescription className="text-center">
            We'd love to hear from you! Reach out through any of these channels.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center space-y-2">
              <div className="w-12 h-12 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full flex items-center justify-center mx-auto">
                <Instagram className="h-6 w-6 text-white" />
              </div>
              <h3 className="font-semibold">Instagram</h3>
              <Badge variant="secondary">souhail_fihri</Badge>
              <p className="text-sm text-muted-foreground">Follow us for updates</p>
            </div>

            <div className="text-center space-y-2">
              <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-blue-600 rounded-full flex items-center justify-center mx-auto">
                <Phone className="h-6 w-6 text-white" />
              </div>
              <h3 className="font-semibold">Phone</h3>
              <Badge variant="secondary">+212 777204234</Badge>
              <p className="text-sm text-muted-foreground">Call us anytime</p>
            </div>

            <div className="text-center space-y-2">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-600 rounded-full flex items-center justify-center mx-auto">
                <Mail className="h-6 w-6 text-white" />
              </div>
              <h3 className="font-semibold">Email</h3>
              <Badge variant="secondary">yousfer.yt@gmail.com</Badge>
              <p className="text-sm text-muted-foreground">Send us a message</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
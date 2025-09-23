import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { MessageCircle, Instagram, Phone, Mail, Send } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export default function Contact() {
  const [issue, setIssue] = useState('');
  const [description, setDescription] = useState('');
  const { toast } = useToast();

  const handleWhatsApp = () => {
    const message = encodeURIComponent("Hello, I am a user of your app and I would like to ask a question.");
    window.open(`https://wa.me/212777204234?text=${message}`, '_blank');
  };

  const handleInstagram = () => {
    window.open('https://instagram.com/souhail_fihri', '_blank');
  };

  const handleEmailSubmit = () => {
    if (!issue.trim() || !description.trim()) {
      toast({
        title: "Missing Information",
        description: "Please fill in both the issue and description fields.",
        variant: "destructive",
      });
      return;
    }

    const subject = encodeURIComponent(issue);
    const body = encodeURIComponent(description);
    window.open(`mailto:yousfer.yt@gmail.com?subject=${subject}&body=${body}`, '_self');
    
    toast({
      title: "Email Client Opened",
      description: "Your default email client should open with the message pre-filled. Just click send!",
    });
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="text-center mb-8 animate-fade-in-up">
        <h1 className="text-4xl md:text-5xl font-bold text-gradient mb-4">
          Contact Us
        </h1>
        <p className="text-lg text-muted-foreground">
          We're here to help! Get in touch with our team.
        </p>
      </div>

      {/* Support Message */}
      <Card className="mb-8 animate-fade-in-scale">
        <CardHeader>
          <CardTitle className="text-center text-2xl">We Appreciate Your Support 🙏</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-lg text-center text-muted-foreground leading-relaxed">
            We hope you have not encountered any issues. If you do, please contact the developer via Instagram, WhatsApp, or Email. 
            Your feedback helps us improve and create better experiences for everyone.
          </p>
        </CardContent>
      </Card>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Quick Contact */}
        <div className="space-y-6">
          <Card className="animate-fade-in-scale">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageCircle className="h-5 w-5" />
                Quick Contact
              </CardTitle>
              <CardDescription>
                Reach out through your preferred platform
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button 
                onClick={handleWhatsApp}
                className="w-full bg-green-600 hover:bg-green-700 text-white"
                size="lg"
              >
                <Phone className="h-5 w-5 mr-2" />
                WhatsApp (+212 777204234)
              </Button>
              
              <Button 
                onClick={handleInstagram}
                className="w-full bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white"
                size="lg"
              >
                <Instagram className="h-5 w-5 mr-2" />
                Instagram (@souhail_fihri)
              </Button>
            </CardContent>
          </Card>

          {/* Contact Info */}
          <Card className="animate-fade-in-scale">
            <CardHeader>
              <CardTitle>Contact Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center">
                  <Phone className="h-5 w-5 text-green-600 dark:text-green-400" />
                </div>
                <div>
                  <p className="font-medium">Phone</p>
                  <p className="text-sm text-muted-foreground">+212 777204234</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-pink-100 dark:bg-pink-900 rounded-full flex items-center justify-center">
                  <Instagram className="h-5 w-5 text-pink-600 dark:text-pink-400" />
                </div>
                <div>
                  <p className="font-medium">Instagram</p>
                  <p className="text-sm text-muted-foreground">@souhail_fihri</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center">
                  <Mail className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <p className="font-medium">Email</p>
                  <p className="text-sm text-muted-foreground">yousfer.yt@gmail.com</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Contact Form */}
        <Card className="animate-fade-in-scale">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Mail className="h-5 w-5" />
              Send us a Message
            </CardTitle>
            <CardDescription>
              Describe your issue and we'll get back to you
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="issue">Issue</Label>
              <Input
                id="issue"
                placeholder="Brief description of your issue"
                value={issue}
                onChange={(e) => setIssue(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                placeholder="Please provide more details about your issue..."
                rows={6}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>

            <Button 
              onClick={handleEmailSubmit}
              className="w-full btn-game"
              size="lg"
            >
              <Send className="h-5 w-5 mr-2" />
              Send Email
            </Button>

            <p className="text-xs text-muted-foreground text-center">
              This will open your default email client with the message pre-filled. Just click send!
            </p>
          </CardContent>
        </Card>
      </div>

      {/* FAQ Section */}
      <Card className="mt-8 animate-fade-in-up">
        <CardHeader>
          <CardTitle className="text-center">Frequently Asked Questions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold mb-2">How does the AI work?</h3>
              <p className="text-sm text-muted-foreground">
                Each board size uses a different AI algorithm optimized for that specific game complexity, from Minimax to Monte Carlo Tree Search.
              </p>
            </div>
            
            <div>
              <h3 className="font-semibold mb-2">Can I suggest new features?</h3>
              <p className="text-sm text-muted-foreground">
                Absolutely! We love hearing from our users. Contact us through any of the channels above with your suggestions.
              </p>
            </div>
            
            <div>
              <h3 className="font-semibold mb-2">Is the game free?</h3>
              <p className="text-sm text-muted-foreground">
                Yes, the game is completely free to play with no ads or hidden costs. Enjoy unlimited gameplay!
              </p>
            </div>
            
            <div>
              <h3 className="font-semibold mb-2">How can I report bugs?</h3>
              <p className="text-sm text-muted-foreground">
                Use the contact form above or reach out via WhatsApp/Instagram. Include details about what happened and what device you're using.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
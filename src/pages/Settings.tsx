import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Moon, Sun, Globe, Type, Palette, Volume2, VolumeX } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { soundManager } from '@/lib/sounds';

export default function Settings() {
  const [language, setLanguage] = useState('en');
  const [fontSize, setFontSize] = useState('medium');
  const [theme, setTheme] = useState('light');
  const [soundEnabled, setSoundEnabled] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    // Load settings from localStorage
    const savedLanguage = localStorage.getItem('language') || 'en';
    const savedFontSize = localStorage.getItem('fontSize') || 'medium';
    const savedTheme = localStorage.getItem('theme') || 'light';
    const savedSoundEnabled = localStorage.getItem('soundEnabled') !== 'false';
    
    setLanguage(savedLanguage);
    setFontSize(savedFontSize);
    setTheme(savedTheme);
    setSoundEnabled(savedSoundEnabled);

    // Apply theme
    if (savedTheme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }

    // Apply font size
    document.documentElement.className = document.documentElement.className.replace(/text-size-\w+/, '');
    document.documentElement.classList.add(`text-size-${savedFontSize}`);

    // Apply sound setting
    soundManager.setEnabled(savedSoundEnabled);
  }, []);

  const handleLanguageChange = (newLanguage: string) => {
    setLanguage(newLanguage);
    localStorage.setItem('language', newLanguage);
    
    toast({
      title: "Language Updated",
      description: `Language changed to ${newLanguage === 'en' ? 'English' : 'Arabic'}`,
    });

    // In a real app, this would trigger language switching
    if (newLanguage === 'ar') {
      document.documentElement.dir = 'rtl';
    } else {
      document.documentElement.dir = 'ltr';
    }
  };

  const handleFontSizeChange = (newFontSize: string) => {
    setFontSize(newFontSize);
    localStorage.setItem('fontSize', newFontSize);
    
    // Remove existing font size class and add new one
    document.documentElement.className = document.documentElement.className.replace(/text-size-\w+/, '');
    document.documentElement.classList.add(`text-size-${newFontSize}`);
    
    toast({
      title: "Font Size Updated",
      description: `Font size changed to ${newFontSize}`,
    });
  };

  const handleThemeChange = (newTheme: string) => {
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    
    if (newTheme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    
    toast({
      title: "Theme Updated",
      description: `Switched to ${newTheme} theme`,
    });
  };

  const handleSoundToggle = (enabled: boolean) => {
    setSoundEnabled(enabled);
    soundManager.setEnabled(enabled);
    localStorage.setItem('soundEnabled', enabled.toString());
    
    // Play a test sound if enabling
    if (enabled) {
      setTimeout(() => soundManager.play('click'), 100);
    }
    
    toast({
      title: enabled ? "Sound Enabled" : "Sound Disabled",
      description: enabled ? "Sound effects are now turned on" : "Sound effects are now turned off",
    });
  };

  const resetSettings = () => {
    setLanguage('en');
    setFontSize('medium');
    setTheme('light');
    setSoundEnabled(true);
    
    localStorage.removeItem('language');
    localStorage.removeItem('fontSize');
    localStorage.removeItem('theme');
    localStorage.removeItem('soundEnabled');
    
    document.documentElement.classList.remove('dark');
    document.documentElement.dir = 'ltr';
    document.documentElement.className = document.documentElement.className.replace(/text-size-\w+/, '');
    document.documentElement.classList.add('text-size-medium');
    soundManager.setEnabled(true);
    
    toast({
      title: "Settings Reset",
      description: "All settings have been reset to default values",
    });
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="text-center mb-8 animate-fade-in-up">
        <h1 className="text-4xl md:text-5xl font-bold text-gradient mb-4">
          Settings
        </h1>
        <p className="text-lg text-muted-foreground">
          Customize your gaming experience
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Appearance Settings */}
        <Card className="animate-fade-in-scale">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Palette className="h-5 w-5" />
              Appearance
            </CardTitle>
            <CardDescription>
              Customize the look and feel of the app
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Theme */}
            <div className="space-y-2">
              <Label className="flex items-center gap-2">
                {theme === 'dark' ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
                Theme
              </Label>
              <Select value={theme} onValueChange={handleThemeChange}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="light">☀️ Light</SelectItem>
                  <SelectItem value="dark">🌙 Dark</SelectItem>
                </SelectContent>
              </Select>
              <p className="text-xs text-muted-foreground">
                Choose between light and dark themes
              </p>
            </div>

            {/* Font Size */}
            <div className="space-y-2">
              <Label className="flex items-center gap-2">
                <Type className="h-4 w-4" />
                Font Size
              </Label>
              <Select value={fontSize} onValueChange={handleFontSizeChange}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="small">🔍 Small</SelectItem>
                  <SelectItem value="medium">📖 Medium</SelectItem>
                  <SelectItem value="large">🔍 Large</SelectItem>
                </SelectContent>
              </Select>
              <p className="text-xs text-muted-foreground">
                Adjust text size for better readability
              </p>
            </div>

            {/* Sound Effects */}
            <div className="space-y-2">
              <Label className="flex items-center gap-2">
                {soundEnabled ? <Volume2 className="h-4 w-4" /> : <VolumeX className="h-4 w-4" />}
                Sound Effects
              </Label>
              <div className="flex items-center justify-between">
                <span className="text-sm">Enable sound effects</span>
                <Switch
                  checked={soundEnabled}
                  onCheckedChange={handleSoundToggle}
                />
              </div>
              <p className="text-xs text-muted-foreground">
                Toggle click, win, and draw sound effects
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Language & Accessibility */}
        <Card className="animate-fade-in-scale">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Globe className="h-5 w-5" />
              Language & Accessibility
            </CardTitle>
            <CardDescription>
              Language and accessibility options
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Language */}
            <div className="space-y-2">
              <Label>Language</Label>
              <Select value={language} onValueChange={handleLanguageChange}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="en">🇺🇸 English</SelectItem>
                  <SelectItem value="ar">🇲🇦 العربية (Arabic)</SelectItem>
                </SelectContent>
              </Select>
              <p className="text-xs text-muted-foreground">
                Select your preferred language
              </p>
            </div>

            {/* Current Settings Summary */}
            <div className="space-y-2">
              <Label>Current Settings</Label>
              <div className="flex flex-wrap gap-2">
                <Badge variant="secondary">
                  {theme === 'dark' ? '🌙 Dark' : '☀️ Light'}
                </Badge>
                <Badge variant="secondary">
                  {fontSize === 'small' ? '🔍 Small' : fontSize === 'medium' ? '📖 Medium' : '🔍 Large'} Text
                </Badge>
                <Badge variant="secondary">
                  {language === 'en' ? '🇺🇸 English' : '🇲🇦 Arabic'}
                </Badge>
                <Badge variant="secondary">
                  {soundEnabled ? '🔊 Sound On' : '🔇 Sound Off'}
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Advanced Settings */}
      <Card className="mt-6 animate-fade-in-up">
        <CardHeader>
          <CardTitle>Advanced Settings</CardTitle>
          <CardDescription>
            Additional options and data management
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <h3 className="font-semibold">Game Preferences</h3>
              <p className="text-sm text-muted-foreground">
                Game-specific settings are saved automatically and persist between sessions.
              </p>
              <ul className="text-xs text-muted-foreground space-y-1">
                <li>• Board size preference</li>
                <li>• AI difficulty level</li>
                <li>• AI thinking delay</li>
              </ul>
            </div>

            <div className="space-y-3">
              <h3 className="font-semibold">Data & Privacy</h3>
              <p className="text-sm text-muted-foreground">
                All settings are stored locally on your device. No data is sent to external servers.
              </p>
              <Button 
                variant="outline" 
                onClick={resetSettings}
                className="w-full"
              >
                Reset All Settings
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Tips */}
      <Card className="mt-6 animate-fade-in-up">
        <CardHeader>
          <CardTitle>💡 Tips</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <h4 className="font-medium mb-1">Dark Theme</h4>
              <p className="text-sm text-muted-foreground">
                Reduces eye strain during extended gaming sessions, especially in low-light environments.
              </p>
            </div>
            
            <div>
              <h4 className="font-medium mb-1">Font Size</h4>
              <p className="text-sm text-muted-foreground">
                Adjust text size based on your device and viewing distance for optimal readability.
              </p>
            </div>
            
            <div>
              <h4 className="font-medium mb-1">Arabic Support</h4>
              <p className="text-sm text-muted-foreground">
                Full RTL (Right-to-Left) layout support for Arabic language users.
              </p>
            </div>
            
            <div>
              <h4 className="font-medium mb-1">Auto-Save</h4>
              <p className="text-sm text-muted-foreground">
                All settings are automatically saved and will be restored when you return.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
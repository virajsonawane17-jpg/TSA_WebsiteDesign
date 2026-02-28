import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { EmergencyBanner } from "@/components/emergency-banner";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Shield, Database, Cookie, Settings, Mail, Phone, MapPin, Calendar, AlertCircle, CheckCircle, Lock, Eye, FileText, Users, Globe, RefreshCw, HelpCircle } from "lucide-react";

export default function PrivacyPolicy() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <EmergencyBanner />
      <Navbar />
      
      <main className="flex-grow">
        <div className="container mx-auto px-4 py-16 sm:px-6">
          <div className="max-w-4xl mx-auto">
            <div className="mb-8">
              <h1 className="text-4xl font-bold font-heading text-primary mb-2">Privacy Policy</h1>
              <p className="text-muted-foreground text-lg">Last updated: February 28, 2026</p>
            </div>
            
            <div className="grid gap-8 lg:grid-cols-2">
              <Card className="h-full">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className="p-3 rounded-full bg-primary/10">
                      <Database className="h-6 w-6 text-primary" />
                    </div>
                    <h2 className="text-xl font-bold text-primary">Information We Collect</h2>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-muted-foreground leading-relaxed">
                    Tampa Community Resource Hub is committed to protecting your privacy. We collect minimal information necessary to provide our services:
                  </p>
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                      <div>
                        <strong className="text-foreground">Resource Submissions:</strong>
                        <p className="text-muted-foreground text-sm mt-1">Name, email, and organization details when you submit resources</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                      <div>
                        <strong className="text-foreground">Profile Information:</strong>
                        <p className="text-muted-foreground text-sm mt-1">Optional profile data including name, phone, and address</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                      <div>
                        <strong className="text-foreground">Usage Analytics:</strong>
                        <p className="text-muted-foreground text-sm mt-1">Anonymous usage data to improve our services</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                      <div>
                        <strong className="text-foreground">Location Data:</strong>
                        <p className="text-muted-foreground text-sm mt-1">General location information for finding nearby resources</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="h-full">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className="p-3 rounded-full bg-secondary/10">
                      <Settings className="h-6 w-6 text-secondary" />
                    </div>
                    <h2 className="text-xl font-bold text-primary">How We Use Your Information</h2>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid gap-4">
                    <div className="flex items-start gap-3 p-4 rounded-lg bg-muted/30">
                      <FileText className="h-5 w-5 text-secondary mt-0.5 shrink-0" />
                      <div>
                        <strong className="text-foreground">Service Delivery:</strong>
                        <p className="text-muted-foreground text-sm mt-1">To connect you with Tampa community resources and organizations</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3 p-4 rounded-lg bg-muted/30">
                      <Mail className="h-5 w-5 text-secondary mt-0.5 shrink-0" />
                      <div>
                        <strong className="text-foreground">Communication:</strong>
                        <p className="text-muted-foreground text-sm mt-1">To respond to inquiries and provide service updates</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3 p-4 rounded-lg bg-muted/30">
                      <RefreshCw className="h-5 w-5 text-secondary mt-0.5 shrink-0" />
                      <div>
                        <strong className="text-foreground">Improvement:</strong>
                        <p className="text-muted-foreground text-sm mt-1">To analyze usage patterns and enhance our platform functionality</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3 p-4 rounded-lg bg-muted/30">
                      <Users className="h-5 w-5 text-secondary mt-0.5 shrink-0" />
                      <div>
                        <strong className="text-foreground">Research:</strong>
                        <p className="text-muted-foreground text-sm mt-1">To understand community needs and resource gaps</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="h-full">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className="p-3 rounded-full bg-orange-100">
                      <Shield className="h-6 w-6 text-orange-600" />
                    </div>
                    <h2 className="text-xl font-bold text-primary">Data Storage & Security</h2>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-muted-foreground leading-relaxed">
                    We use industry-standard security measures to protect your information:
                  </p>
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <Lock className="h-5 w-5 text-orange-600 mt-0.5 shrink-0" />
                      <div>
                        <strong className="text-foreground">Secure Database:</strong>
                        <p className="text-muted-foreground text-sm mt-1">All data stored in encrypted Supabase database</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Lock className="h-5 w-5 text-orange-600 mt-0.5 shrink-0" />
                      <div>
                        <strong className="text-foreground">HTTPS Encryption:</strong>
                        <p className="text-muted-foreground text-sm mt-1">All data transmissions use secure HTTPS protocols</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Lock className="h-5 w-5 text-orange-600 mt-0.5 shrink-0" />
                      <div>
                        <strong className="text-foreground">Access Controls:</strong>
                        <p className="text-muted-foreground text-sm mt-1">Limited access to sensitive user information</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Lock className="h-5 w-5 text-orange-600 mt-0.5 shrink-0" />
                      <div>
                        <strong className="text-foreground">Regular Updates:</strong>
                        <p className="text-muted-foreground text-sm mt-1">Security measures regularly updated and monitored</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="h-full">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className="p-3 rounded-full bg-primary/10">
                      <Globe className="h-6 w-6 text-primary" />
                    </div>
                    <h2 className="text-xl font-bold text-primary">Third-Party Services</h2>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-muted-foreground leading-relaxed">
                    We integrate with trusted third-party services to enhance functionality:
                  </p>
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <Database className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                      <div>
                        <strong className="text-foreground">Supabase:</strong>
                        <p className="text-muted-foreground text-sm mt-1">Database hosting and authentication services</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Eye className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                      <div>
                        <strong className="text-foreground">Google Fonts:</strong>
                        <p className="text-muted-foreground text-sm mt-1">Typography and font delivery</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Eye className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                      <div>
                        <strong className="text-foreground">Unsplash:</strong>
                        <p className="text-muted-foreground text-sm mt-1">Stock images for resource illustrations</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <MapPin className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                      <div>
                        <strong className="text-foreground">Tampa Government APIs:</strong>
                        <p className="text-muted-foreground text-sm mt-1">Official community event and news data</p>
                      </div>
                    </div>
                  </div>
                  <p className="text-muted-foreground text-sm mt-4 bg-muted/30 p-3 rounded-lg">
                    These services have their own privacy policies and we encourage you to review them.
                  </p>
                </CardContent>
              </Card>

              <Card className="h-full">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className="p-3 rounded-full bg-orange-100">
                      <Cookie className="h-6 w-6 text-orange-600" />
                    </div>
                    <h2 className="text-xl font-bold text-primary">Cookies & Tracking</h2>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid gap-4">
                    <div className="flex items-start gap-3 p-4 rounded-lg bg-muted/30">
                      <Cookie className="h-5 w-5 text-orange-600 mt-0.5 shrink-0" />
                      <div>
                        <strong className="text-foreground">Essential Cookies:</strong>
                        <p className="text-muted-foreground text-sm mt-1">Required for basic site functionality and authentication</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3 p-4 rounded-lg bg-muted/30">
                      <Cookie className="h-5 w-5 text-orange-600 mt-0.5 shrink-0" />
                      <div>
                        <strong className="text-foreground">Analytics Cookies:</strong>
                        <p className="text-muted-foreground text-sm mt-1">Anonymous usage statistics to improve user experience</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3 p-4 rounded-lg bg-muted/30">
                      <Cookie className="h-5 w-5 text-orange-600 mt-0.5 shrink-0" />
                      <div>
                        <strong className="text-foreground">Preference Cookies:</strong>
                        <p className="text-muted-foreground text-sm mt-1">Remember your settings and preferences</p>
                      </div>
                    </div>
                  </div>
                  <p className="text-muted-foreground text-sm mt-4 bg-muted/30 p-3 rounded-lg">
                    You can control cookie settings through your browser preferences.
                  </p>
                </CardContent>
              </Card>

              <Card className="h-full">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className="p-3 rounded-full bg-secondary/10">
                      <CheckCircle className="h-6 w-6 text-secondary" />
                    </div>
                    <h2 className="text-xl font-bold text-primary">Your Rights & Choices</h2>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-muted-foreground leading-relaxed">
                    You have the following rights regarding your personal information:
                  </p>
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-secondary mt-0.5 shrink-0" />
                      <div>
                        <strong className="text-foreground">Access:</strong>
                        <p className="text-muted-foreground text-sm mt-1">Request copies of your personal information</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-secondary mt-0.5 shrink-0" />
                      <div>
                        <strong className="text-foreground">Correction:</strong>
                        <p className="text-muted-foreground text-sm mt-1">Update or correct inaccurate information</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-secondary mt-0.5 shrink-0" />
                      <div>
                        <strong className="text-foreground">Deletion:</strong>
                        <p className="text-muted-foreground text-sm mt-1">Request removal of your personal information</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-secondary mt-0.5 shrink-0" />
                      <div>
                        <strong className="text-foreground">Portability:</strong>
                        <p className="text-muted-foreground text-sm mt-1">Transfer your data to other services</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-secondary mt-0.5 shrink-0" />
                      <div>
                        <strong className="text-foreground">Opt-out:</strong>
                        <p className="text-muted-foreground text-sm mt-1">Choose not to receive certain communications</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="h-full">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className="p-3 rounded-full bg-primary/10">
                      <Users className="h-6 w-6 text-primary" />
                    </div>
                    <h2 className="text-xl font-bold text-primary">Data Sharing</h2>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-muted-foreground leading-relaxed">
                    We do not sell your personal information. We may share data only in these circumstances:
                  </p>
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <Users className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                      <div>
                        <strong className="text-foreground">Resource Organizations:</strong>
                        <p className="text-muted-foreground text-sm mt-1">Contact information when you request assistance</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <AlertCircle className="h-5 w-5 text-orange-600 mt-0.5 shrink-0" />
                      <div>
                        <strong className="text-foreground">Legal Requirements:</strong>
                        <p className="text-muted-foreground text-sm mt-1">When required by law or to protect our rights</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Shield className="h-5 w-5 text-orange-600 mt-0.5 shrink-0" />
                      <div>
                        <strong className="text-foreground">Safety:</strong>
                        <p className="text-muted-foreground text-sm mt-1">To prevent harm or protect users</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <RefreshCw className="h-5 w-5 text-orange-600 mt-0.5 shrink-0" />
                      <div>
                        <strong className="text-foreground">Business Transfer:</strong>
                        <p className="text-muted-foreground text-sm mt-1">In case of merger, acquisition, or asset sale</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="h-full">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className="p-3 rounded-full bg-orange-100">
                      <Users className="h-6 w-6 text-orange-600" />
                    </div>
                    <h2 className="text-xl font-bold text-primary">Children's Privacy</h2>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-muted-foreground leading-relaxed">
                    Our service is not directed to children under 13. We do not knowingly collect personal information 
                    from children under 13. If we become aware that we have collected such information, 
                    we will take steps to delete it immediately.
                  </p>
                </CardContent>
              </Card>

              <Card className="h-full">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className="p-3 rounded-full bg-primary/10">
                      <Globe className="h-6 w-6 text-primary" />
                    </div>
                    <h2 className="text-xl font-bold text-primary">International Users</h2>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-muted-foreground leading-relaxed">
                    Tampa Community Resource Hub is operated from the United States and intended for Tampa, Florida residents. 
                    If you are accessing our service from outside the U.S., you are responsible for compliance with 
                    local laws regarding data collection and processing.
                  </p>
                </CardContent>
              </Card>

              <Card className="h-full">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className="p-3 rounded-full bg-secondary/10">
                      <RefreshCw className="h-6 w-6 text-secondary" />
                    </div>
                    <h2 className="text-xl font-bold text-primary">Policy Updates</h2>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-muted-foreground leading-relaxed">
                    We may update this privacy policy from time to time. Changes will be posted on this page 
                    with an updated revision date. We encourage you to review this policy periodically.
                  </p>
                  <div className="bg-muted/30 p-4 rounded-lg mt-4">
                    <p className="text-muted-foreground text-sm">
                      <strong>Last Updated:</strong> February 28, 2026
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card className="h-full">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className="p-3 rounded-full bg-orange-100">
                      <HelpCircle className="h-6 w-6 text-orange-600" />
                    </div>
                    <h2 className="text-xl font-bold text-primary">Contact Us</h2>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-muted-foreground leading-relaxed">
                    If you have questions about this Privacy Policy or our data practices, please contact us:
                  </p>
                  <div className="bg-muted/50 p-6 rounded-lg mt-4">
                    <div className="space-y-3">
                      <div className="flex items-center gap-3">
                        <Mail className="h-5 w-5 text-orange-600" />
                        <div>
                          <strong className="text-foreground">Email:</strong>
                          <p className="text-muted-foreground text-sm">privacy@tamparesourcehub.org</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <MapPin className="h-5 w-5 text-orange-600" />
                        <div>
                          <strong className="text-foreground">Location:</strong>
                          <p className="text-muted-foreground text-sm">Hillsborough County, Florida</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <Calendar className="h-5 w-5 text-orange-600" />
                        <div>
                          <strong className="text-foreground">Response Time:</strong>
                          <p className="text-muted-foreground text-sm">We respond to privacy inquiries within 30 days</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}

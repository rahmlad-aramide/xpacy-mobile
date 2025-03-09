import { useState } from "react";
import { ScrollView, View } from "react-native";
import { HeaderSection } from "./HeaderSection";
import { ActionsSection } from "./ActionsSection";
import { FeaturedPropertiesSection } from "./FeaturedPropertiesSection";
import { LatestPropertiesSection } from "./LatestPropertiesSection";

function Home() {
  const [action, setAction] = useState("Buy");
  const [saved, setSaved] = useState(false);

  return (
    <ScrollView className="px-6 pt-4 bg-background">
      <View className="flex gap-6 pb-12">
        {/* Header Section */}
        <HeaderSection />
        <View>
          {/* Actions Section */}
          <ActionsSection action={action} setAction={setAction} />
          {/* Featured Properties Sections */}
          <FeaturedPropertiesSection />
          {/* Latest Properties Sections */}
          <LatestPropertiesSection />
          
        </View>
      </View>
    </ScrollView>
  );
}
export default Home;

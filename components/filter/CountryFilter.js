import React, { useEffect, useState } from 'react';
import { 
  VStack, 
  Text, 
  HStack, 
  Box,
  Pressable
} from '@gluestack-ui/themed';
import { Image, ActivityIndicator, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';

export default function CountryFilter({
  onCountrySelect
}) {
  const router = useRouter();
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const res = await fetch('https://www.themealdb.com/api/json/v1/1/list.php?a=list');
        const json = await res.json();
        const areas = json?.meals || [];

        // Fetch semua negara dari restcountries
        const countriesRes = await fetch('https://restcountries.com/v3.1/all?fields=name,demonyms,cca2,flags');
        const countriesData = await countriesRes.json();

        const mappedCountries = areas.map((item, idx) => {
          const areaName = item.strArea;
          
          const country = countriesData.find(c => {
            const demonymEng = c.demonyms?.eng?.m || c.demonyms?.eng?.f || '';
            return demonymEng.toLowerCase() === areaName.toLowerCase();
          });

          return {
            id: idx + 1,
            name: areaName,
            flag: { uri: country?.flags?.png || 'https://flagcdn.com/w80/un.png' }
          };
        });

        setCountries(mappedCountries);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };
    fetchCountries();
  }, []);

  if (loading) {
    return (
      <VStack flex={1} bg="#00A86B" justifyContent="center" alignItems="center">
        <ActivityIndicator size="large" color="white" />
      </VStack>
    );
  }

  return (
    <VStack flex={1} bg="#00A86B">
      {/* Header */}
      <VStack p="$6" pt="$2" pb="$2">
        <Text fontSize="$3xl" fontWeight="$bold" color="white">
          Explore by Country
        </Text>
        <Text fontSize="$md" color="rgba(255,255,255,0.8)">
          Discover recipes from around the world
        </Text>
      </VStack>
      {countries.length > 0 && (
        <VStack p="$6" pt="$4">
          <Text 
            fontSize="$lg" 
            fontWeight="$bold" 
            color="$coolGray800" 
            bg="white" 
            px="$4" 
            py="$2" 
            borderRadius="$3xl"
            alignSelf="flex-start"
            mb="$3"
          >
            Popular Country
          </Text>

          <Pressable
            bg="$white"
            borderRadius="$2xl"
            p="$4"
            onPress={() => {
              if (onCountrySelect) onCountrySelect(countries[0]?.id, countries[0]?.name);
              router.push(`/filter/result/countries-filter-result?country=${encodeURIComponent(countries[0]?.name)}`);
            }}
            shadowColor="#000000"
            shadowOffset={{ width: 0, height: 4 }}
            shadowOpacity={0.15}
            shadowRadius={8}
            elevation={5}
          >
            <HStack alignItems="center" space="md">
              <Image 
                source={countries[0]?.flag}
                style={{ 
                  width: 80, 
                  height: 60, 
                  borderRadius: 8, 
                  borderWidth: 2, 
                  borderColor: '#E5E7EB' 
                }}
                resizeMode="cover"
              />
              <Text fontSize="$2xl" fontWeight="$bold" color="$coolGray800">
                {countries[0]?.name}
              </Text>
            </HStack>
          </Pressable>
        </VStack>
      )}
      
      <VStack
        flex={1}
        bg="white" 
        borderTopLeftRadius={50} 
        borderTopRightRadius={50}
        mt="$0"
      >
        <VStack pt="$8" px="$6" pb="$3" bg="white" borderTopLeftRadius={50} borderTopRightRadius={50}>
          <Text fontSize="$md" fontWeight="$bold" color="$coolGray800">
            All Countries ({countries.length})
          </Text>
        </VStack>

        <ScrollView
          style={{ flex: 1 }}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 24 }}
        >
          <VStack px="$6" space="md">
            {Array.from({ length: Math.ceil(countries.length / 3) }, (_, rowIndex) => (
              <HStack key={rowIndex} space="md" justifyContent="space-between">
                {countries.slice(rowIndex * 3, (rowIndex + 1) * 3).map((country) => (
                  <Pressable
                    key={country.id}
                    flex={1}
                    bg="$white"
                    borderRadius="$2xl"
                    justifyContent="center"
                    alignItems="center"
                    py="$4"
                    px="$3"
                    onPress={() => {
                      if (onCountrySelect) onCountrySelect(country.id, country.name);
                      router.push(`/filter/result/countries-filter-result?country=${encodeURIComponent(country.name)}`);
                    }}
                    shadowColor="#000000"
                    shadowOffset={{ width: 0, height: 4 }}
                    shadowOpacity={0.15}
                    shadowRadius={8}
                    elevation={5}
                  >
                    <Image 
                      source={country.flag}
                      style={{ 
                        width: 50, 
                        height: 35, 
                        borderRadius: 8, 
                        borderWidth: 2, 
                        borderColor: '#E5E7EB' 
                      }}
                      resizeMode="cover"
                    />
                    <Text fontSize="$sm" fontWeight="$bold" color="$coolGray800" mt="$2" textAlign="center">
                      {country.name}
                    </Text>
                  </Pressable>
                ))}
                {countries.slice(rowIndex * 3, (rowIndex + 1) * 3).length < 3 &&
                  Array.from({ length: 3 - countries.slice(rowIndex * 3, (rowIndex + 1) * 3).length }).map((_, emptyIndex) => (
                    <Box key={`empty-${emptyIndex}`} flex={1} />
                  ))
                }
              </HStack>
            ))}
          </VStack>
        </ScrollView>
      </VStack>
    </VStack>
  );
}
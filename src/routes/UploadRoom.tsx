import {
    Box,
    Button,
    Checkbox,
    Container,
    FormControl,
    FormHelperText,
    FormLabel,
    Grid,
    Heading,
    Input,
    InputGroup,
    InputLeftAddon,
    InputLeftElement,
    NumberDecrementStepper,
    NumberIncrementStepper,
    NumberInput,
    NumberInputField,
    NumberInputStepper,
    Select,
    Textarea,
    VStack,
    Text,
    useToast, 
  } from "@chakra-ui/react";
import { FaBed, FaMoneyBill, FaToilet, FaUsb } from "react-icons/fa";
import useHostOnlyPage from "../components/HostOnlyPage";
import ProtectedPage from "../components/ProtectedPage";
import { IUploadRoomVariables, getAmenities, getCategories, uploadRoom } from "../api";
import { useMutation, useQuery } from "@tanstack/react-query";
import { IAmenity, ICategory, IRoomDetail } from "../types";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";


export default function UploadRoom() {
    const { register, handleSubmit } = useForm<IUploadRoomVariables>();
    const toast = useToast();
    const navigate = useNavigate();
    const mutation = useMutation(uploadRoom, {
        onSuccess:(data: IRoomDetail) => {
            toast({
                status: "success",
                title: "Room created",
                position: "bottom-right",
            });
            navigate(`/rooms/${data.id}`)
        },

    });
    const {data: amenities, isLoading: isAmenitiesLoading} = useQuery<IAmenity[]>(["amenities"], getAmenities);
    console.log(amenities, isAmenitiesLoading)
    const {data: categories, isLoading: isCategoriesLoading } = useQuery<ICategory[]>(["categories"], getCategories)
    useHostOnlyPage();
    const onsSubmint = (data:IUploadRoomVariables) => {
        mutation.mutate(data);
    };

    return (
      <ProtectedPage>
        <h1>숙소 업데이트</h1>
        <Box
          pb={40}
          mt={10}
          px={{
            base: 10,
            lg: 40,
          }}
        >
          <Container>
            <Heading textAlign={"center"}>숙소 업데이트</Heading>
            <VStack spacing={5} as="form" onSubmit={handleSubmit(onsSubmint)} mt={5}>
              <FormControl>
                <FormLabel>숙소명</FormLabel>
                <Input {...register("name", {required: true})} required type="text"  />
                <FormHelperText>숙소의 이름을 입력하세요.</FormHelperText>
              </FormControl>
              <FormControl>
                <FormLabel>국가</FormLabel>
                <Input {...register("country", {required: true})} required type= "text" />
              </FormControl>
              <FormControl>
                <FormLabel>도시</FormLabel>
                <Input {...register("city", {required: true})} required type="text" />
              </FormControl>
              <FormControl>
                <FormLabel>주소</FormLabel>
                <Input {...register("address", {required: true})} required type="text" />
              </FormControl>
              <FormControl>
                <FormLabel>가격</FormLabel>
                <InputGroup>
                  <InputLeftAddon children={<FaMoneyBill />} />
                  <Input {...register("price", {required: true})} type="number" min={0} />
                </InputGroup>
              </FormControl>
              <FormControl>
                <FormLabel>침실의 수</FormLabel>
                <InputGroup>
                  <InputLeftAddon children={<FaBed />} />
                  <Input {...register("rooms", {required: true})} type="number" min={0} />
                </InputGroup>
              </FormControl>
              <FormControl>
                <FormLabel>욕실의 수</FormLabel>
                <InputGroup>
                  <InputLeftAddon children={<FaToilet />} />
                  <Input {...register("toilets", {required: true})} type="number" min={0} />
                </InputGroup>
              </FormControl>
              <FormControl>
                <FormLabel>숙소 소개</FormLabel>
                <Textarea {...register("description", {required: true})} />
              </FormControl>
              <FormControl>
                <Checkbox {...register("pet_friendly", {required: true})} >반려동물 허용</Checkbox>
              </FormControl>
              <FormControl>
                <FormLabel>방의 종류</FormLabel>
                <Select {...register("kind", {required: true})} placeholder="원하시는 종류의 방을 고르세요">
                  <option value="entire_place"></option>
                  <option value="private_room">개인실</option>
                  <option value="shared_room">다인실</option>
                </Select>
                <FormHelperText>
                  어떤 종류의 방을 예약하길 원하십니까?
                </FormHelperText>
              </FormControl>
              <FormControl>
                <FormLabel>카테고리</FormLabel>
                <Select {...register("category", {required: true})} placeholder="카테고리를 선택하세요">
                    {categories?.map(category=> <option key={category.pk} value={category.pk}>{category.name}</option>)}
                </Select>
                <FormHelperText>
                  What category describes your room?
                </FormHelperText>
              </FormControl>
              <FormControl>
                <FormLabel>부대시설 및 서비스</FormLabel>
                <Grid templateColumns={"1fr 1fr"} gap={5}>
                    {amenities?.map((amenity) => (
                        <Box key={amenity.pk}>
                            <Checkbox value={amenity.pk} {...register("amenities", {required: true})} >{amenity.name}</Checkbox>
                            <FormHelperText>{amenity.description}</FormHelperText>
                        </Box>
                    ))}
                </Grid>
              </FormControl>
              {mutation.isError ? <Text color="red.500">오류를 수정해 주십시오</Text> : null}
              <Button type="submit" isLoading={mutation.isLoading} colorScheme={"red"} size="lg" w="100%">완료</Button>
            </VStack>
          </Container>
        </Box>
      </ProtectedPage>
    );
}
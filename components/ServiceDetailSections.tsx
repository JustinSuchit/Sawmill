import { getPageProducts } from "@/lib/catalog";
import { ServiceFeature } from "./ServiceFeature";

export async function ServiceDetailSections() {
  const services = await getPageProducts("services");
  return <>{services.map((service,index) => <ServiceFeature key={service.id} service={service} index={index} haulageVisible={services.some(item => item.id === "haulage")} />)}</>;
}

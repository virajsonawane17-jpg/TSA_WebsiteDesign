"use client";

import "leaflet/dist/leaflet.css";
import { useMemo } from "react";
import {
  MapContainer,
  TileLayer,
  CircleMarker,
  Tooltip,
  useMap,
} from "react-leaflet";
import type { Resource } from "@/lib/resources";

interface TampaResourceMapProps {
  resources: Resource[];
  selectedResourceId: string | null;
  onSelectResource: (id: string) => void;
}

function RecenterOnSelect({
  resources,
  selectedResourceId,
}: {
  resources: Resource[];
  selectedResourceId: string | null;
}) {
  const map = useMap();

  const target = useMemo(
    () => resources.find((r) => r.id === selectedResourceId),
    [resources, selectedResourceId],
  );

  if (target) {
    map.setView([target.lat, target.lng], 12);
  }

  return null;
}

export function TampaResourceMap({
  resources,
  selectedResourceId,
  onSelectResource,
}: TampaResourceMapProps) {
  const defaultCenter: [number, number] = [27.96, -82.46];

  const mapCenter: [number, number] = useMemo(() => {
    if (!resources.length) return defaultCenter;

    const avgLat =
      resources.reduce((sum, r) => sum + r.lat, 0) / resources.length;
    const avgLng =
      resources.reduce((sum, r) => sum + r.lng, 0) / resources.length;

    return [avgLat, avgLng];
  }, [resources]);

  return (
    <div className="h-full w-full rounded-3xl border border-border/40 shadow-inner overflow-hidden bg-muted">
      <MapContainer
        center={mapCenter}
        zoom={11}
        scrollWheelZoom
        className="h-full w-full"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {resources.map((resource) => {
          const isSelected = resource.id === selectedResourceId;

          return (
            <CircleMarker
              key={resource.id}
              center={[resource.lat, resource.lng]}
              radius={isSelected ? 11 : 8}
              pathOptions={{
                color: isSelected ? "#f97316" : "#0f766e",
                weight: 3,
                fillColor: isSelected ? "#fb923c" : "#14b8a6",
                fillOpacity: 0.85,
              }}
              eventHandlers={{
                click: () => onSelectResource(resource.id),
              }}
            >
              <Tooltip direction="top" offset={[0, -4]} opacity={1}>
                <div className="text-xs font-semibold text-primary">
                  {resource.name}
                </div>
                <div className="text-[10px] text-muted-foreground">
                  {resource.category}
                </div>
              </Tooltip>
            </CircleMarker>
          );
        })}

        <RecenterOnSelect
          resources={resources}
          selectedResourceId={selectedResourceId}
        />
      </MapContainer>
    </div>
  );
}


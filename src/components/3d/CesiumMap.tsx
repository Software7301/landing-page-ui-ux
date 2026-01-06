import { useEffect, useState, useRef, useCallback } from 'react';
import { Viewer, Entity, useCesium } from 'resium';
import * as Cesium from 'cesium';
import 'cesium/Build/Cesium/Widgets/widgets.css';
import { NodeTooltip } from './NodeTooltip';

if (typeof window !== 'undefined') {
  (window as any).CESIUM_BASE_URL = '/node_modules/cesium/Build/Cesium/';
}

interface NetworkNode {
  id: string;
  ip: string;
  location: string;
  coordinates: [number, number];
  status: 'online' | 'offline';
}

interface CesiumMapProps {
  networkNodes?: NetworkNode[];
  height?: string;
}

const defaultNetworkNodes: NetworkNode[] = [
  { id: '1', ip: '192.168.1.100', location: 'São Paulo, BR', coordinates: [-46.6333, -23.5505], status: 'online' },
  { id: '2', ip: '10.0.0.45', location: 'New York, US', coordinates: [-74.0060, 40.7128], status: 'online' },
  { id: '3', ip: '172.16.0.12', location: 'London, UK', coordinates: [-0.1276, 51.5074], status: 'online' },
  { id: '4', ip: '203.0.113.78', location: 'Tokyo, JP', coordinates: [139.6503, 35.6762], status: 'online' },
  { id: '5', ip: '198.51.100.34', location: 'Sydney, AU', coordinates: [151.2093, -33.8688], status: 'online' },
];

interface TooltipState {
  visible: boolean;
  x: number;
  y: number;
  node: NetworkNode | null;
}

function ViewerConfig({ 
  networkNodes,
  onNodeHover 
}: { 
  networkNodes: NetworkNode[];
  onNodeHover: (node: NetworkNode | null, x: number, y: number) => void;
}) {
  const { viewer } = useCesium();
  const entityMapRef = useRef<Map<string, NetworkNode>>(new Map());
  
  useEffect(() => {
    if (!viewer) return;

    // Criar mapa de entidades para lookup
    networkNodes.forEach(node => {
      entityMapRef.current.set(node.id, node);
    });

    // Desabilitar interatividade
    viewer.scene.screenSpaceCameraController.enableRotate = false;
    viewer.scene.screenSpaceCameraController.enableTranslate = false;
    viewer.scene.screenSpaceCameraController.enableZoom = false;
    viewer.scene.screenSpaceCameraController.enableTilt = false;
    viewer.scene.screenSpaceCameraController.enableLook = false;

    // Configurar globo com cores grafite
    viewer.scene.globe.enableLighting = false;
    viewer.scene.globe.showWaterEffect = false;
    
    const canvas = document.createElement('canvas');
    canvas.width = 512;
    canvas.height = 256;
    const ctx = canvas.getContext('2d');
    
    if (ctx) {
      ctx.fillStyle = '#1a1a1a';
      ctx.fillRect(0, 0, 512, 256);
      ctx.fillStyle = '#2a2a2a';
      
      ctx.beginPath();
      ctx.ellipse(128, 128, 60, 100, 0, 0, Math.PI * 2);
      ctx.fill();
      
      ctx.beginPath();
      ctx.ellipse(320, 128, 100, 80, 0, 0, Math.PI * 2);
      ctx.fill();
      
      ctx.beginPath();
      ctx.ellipse(420, 180, 40, 30, 0, 0, Math.PI * 2);
      ctx.fill();
    }
    
    const dataUrl = canvas.toDataURL();
    const imageryProvider = new Cesium.SingleTileImageryProvider({
      url: dataUrl,
      tileWidth: 512,
      tileHeight: 256,
    });
    
    viewer.scene.globe.imageryLayers.removeAll();
    viewer.scene.globe.imageryLayers.addImageryProvider(imageryProvider);
    viewer.scene.globe.baseColor = Cesium.Color.WHITE.withAlpha(0);
    
    if (viewer.scene.skyBox) viewer.scene.skyBox.show = false;
    if (viewer.scene.sun) viewer.scene.sun.show = false;
    if (viewer.scene.moon) viewer.scene.moon.show = false;
    if (viewer.scene.skyAtmosphere) viewer.scene.skyAtmosphere.show = false;
    
    viewer.scene.backgroundColor = Cesium.Color.fromCssColorString('#0B0B0F');

    viewer.camera.flyTo({
      destination: Cesium.Cartesian3.fromDegrees(0, 0, 28000000),
      orientation: {
        heading: Cesium.Math.toRadians(0),
        pitch: Cesium.Math.toRadians(-75),
        roll: 0.0,
      },
      duration: 2.0,
    });
    
    setTimeout(() => {
      viewer.camera.setView({
        destination: Cesium.Cartesian3.fromDegrees(0, 0, 28000000),
        orientation: {
          heading: Cesium.Math.toRadians(0),
          pitch: Cesium.Math.toRadians(-75),
          roll: 0.0,
        },
      });
    }, 2100);

    // Handler para hover
    const handler = new Cesium.ScreenSpaceEventHandler(viewer.scene.canvas);
    
    handler.setInputAction((movement: any) => {
      const pickedObject = viewer.scene.pick(movement.endPosition);
      
      if (Cesium.defined(pickedObject) && pickedObject.id) {
        const entity = pickedObject.id as Cesium.Entity;
        const entityId = entity.id;
        
        // Buscar node pelo ID da entidade
        const node = entityMapRef.current.get(entityId as string);
        
        if (node) {
          const rect = viewer.scene.canvas.getBoundingClientRect();
          const x = movement.endPosition.x + rect.left;
          const y = movement.endPosition.y + rect.top;
          onNodeHover(node, x, y);
        } else {
          onNodeHover(null, 0, 0);
        }
      } else {
        onNodeHover(null, 0, 0);
      }
    }, Cesium.ScreenSpaceEventType.MOUSE_MOVE);

    return () => {
      handler.destroy();
    };
  }, [viewer, networkNodes, onNodeHover]);

  return null;
}

export function CesiumMap({ networkNodes = defaultNetworkNodes, height = '100%' }: CesiumMapProps) {
  const [mounted, setMounted] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const [tooltip, setTooltip] = useState<TooltipState>({
    visible: false,
    x: 0,
    y: 0,
    node: null,
  });

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleNodeHover = useCallback((node: NetworkNode | null, x: number, y: number) => {
    if (node) {
      setTooltip({
        visible: true,
        x,
        y,
        node,
      });
    } else {
      setTooltip(prev => prev.visible ? {
        visible: false,
        x: 0,
        y: 0,
        node: null,
      } : prev);
    }
  }, []);

  if (!mounted) {
    return (
      <div className="w-full h-full bg-[#0B0B0F] flex items-center justify-center" style={{ height }}>
        <div className="text-[#9CA3AF] text-sm">Loading globe...</div>
      </div>
    );
  }

  return (
    <div ref={containerRef} className="w-full h-full relative bg-gradient-to-b from-transparent via-[#1a0d2e]/10 to-transparent" style={{ height }}>
      <Viewer
        full
        className="cesium-viewer-custom"
        baseLayerPicker={false}
        animation={false}
        timeline={false}
        vrButton={false}
        geocoder={false}
        homeButton={false}
        infoBox={false}
        sceneModePicker={false}
        selectionIndicator={false}
        navigationHelpButton={false}
        navigationInstructionsInitiallyVisible={false}
        scene3DOnly={true}
        requestRenderMode={true}
        maximumRenderTimeChange={Infinity}
        terrainProvider={new Cesium.EllipsoidTerrainProvider()}
      >
        <ViewerConfig networkNodes={networkNodes} onNodeHover={handleNodeHover} />
        {networkNodes.map((node) => (
          <Entity
            key={node.id}
            id={node.id}
            position={Cesium.Cartesian3.fromDegrees(node.coordinates[0], node.coordinates[1], 0)}
            point={{
              pixelSize: 10,
              color: Cesium.Color.fromCssColorString('#7C3AED'),
              outlineColor: Cesium.Color.fromCssColorString('#7C3AED').withAlpha(0.5),
              outlineWidth: 1,
              heightReference: Cesium.HeightReference.CLAMP_TO_GROUND,
              scaleByDistance: new Cesium.NearFarScalar(1.5e7, 1.0, 2.8e7, 0.5),
            }}
          />
        ))}
      </Viewer>
      
      {tooltip.node && (
        <NodeTooltip
          isVisible={tooltip.visible}
          x={tooltip.x}
          y={tooltip.y}
          ip={tooltip.node.ip}
          location={tooltip.node.location}
          status={tooltip.node.status}
        />
      )}
    </div>
  );
}
